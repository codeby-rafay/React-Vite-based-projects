import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // you'd send this to a backend
    console.log('Form submitted:', form)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1
          className="text-4xl font-bold text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Contact Us
        </h1>
        <p className="text-gray-500 mt-3">
          Have a question? We'd love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center">
          <div className="text-5xl mb-4"><img className="size-12" src="https://www.svgrepo.com/show/422280/correct-success-tick.svg" alt="Correct" /></div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Message Sent!
          </h2>
          <p className="text-green-600 text-sm">
            Thank you for reaching out. We'll get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl cursor-pointer text-sm font-medium transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          {/* Form — using div+onClick instead of form submit for React best practices */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@gmail.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Write your message here..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.email || !form.message}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold text-sm transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          {
            icon: (
              <img
                className="size-8"
                src="https://www.svgrepo.com/show/502648/email.svg"
                alt="Email"
              />
            ),
            label: "Email",
            value: "hello@producthub.com",
          },
          {
            icon: (
              <img
                className="size-8"
                src="https://www.svgrepo.com/show/522677/telephone.svg"
                alt="Phone"
              />
            ),
            label: "Phone",
            value: "+x xxxxxxxxxx",
          },
          {
            icon: (
              <img
                className="size-8"
                src="https://www.svgrepo.com/show/532540/location-pin-alt-1.svg"
                alt="Location"
              />
            ),
            label: "Location",
            value: "Islamabad, Pakistan",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-100 rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-1 flex justify-center ">
              {item.icon}
            </div>
            <div className="text-xs text-gray-400">{item.label}</div>
            <div className="text-xs font-medium text-gray-700 mt-1">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
