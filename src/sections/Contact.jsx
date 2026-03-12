import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const recipientName = 'Subodh Kumar';
  const recipientEmail = 'subodh261003kumar@gmail.com';

  const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      showAlert({
        show: true,
        text: 'Email service is not configured. Add EmailJS keys in your .env file.',
        type: 'danger',
      });
      setTimeout(() => hideAlert(), 3000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: recipientName,
          from_email: form.email,
          to_email: recipientEmail,
          message: form.message,
        },
        publicKey,
      );

      setLoading(false);
      showAlert({
        show: true,
        text: 'Thank you for reaching out. I will get back to you shortly.',
        type: 'success',
      });

      setTimeout(() => {
        hideAlert();
        setForm({
          name: '',
          email: '',
          message: '',
        });
      }, 3000);
    } catch {
      setLoading(false);

      showAlert({
        show: true,
        text: "Couldn't send your message. Please try again.",
        type: 'danger',
      });
      setTimeout(() => hideAlert(), 3500);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-[80vh] flex items-center justify-center flex-col py-10">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you need a new website, upgrades to your current platform, or help turning a unique idea into reality,
            I'm ready to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
