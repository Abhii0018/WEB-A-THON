import React from 'react';

const ContactSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('Thanks! We will reach out shortly.');
  };

  return (
    <section id="contact" className="py-16 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mt-2">
            Lets talk about your next task
          </h2>
          <p className="text-gray-500 mt-3">
            Tell us what you need and we will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200/40 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800">Contact details</h3>
            <p className="text-gray-600 mt-2">
              Reach us directly or leave a message using the form.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-gray-200/40 bg-white/80 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                <p className="text-gray-800 font-medium">support@helpzo.com</p>
              </div>
              <div className="rounded-xl border border-gray-200/40 bg-white/80 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                <p className="text-gray-800 font-medium">+1 (555) 234-5678</p>
              </div>
              <div className="rounded-xl border border-gray-200/40 bg-white/80 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase">Hours</p>
                <p className="text-gray-800 font-medium">Mon - Sat, 9am - 6pm</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200/40 bg-white/80 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">Response time</p>
              <p className="text-gray-800 font-medium">Usually within 24 hours</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200/40 bg-white/70 backdrop-blur-sm p-6 shadow-sm"
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">
                  First name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Jane"
                    className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                    required
                  />
                </label>
              </div>

              <label className="text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Phone
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Topic
                <select
                  name="topic"
                  className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="booking">Booking help</option>
                  <option value="services">Services inquiry</option>
                  <option value="partnership">Partnerships</option>
                  <option value="support">Support</option>
                </select>
              </label>

              <label className="text-sm font-medium text-gray-700">
                Message
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us about your request"
                  className="mt-2 w-full rounded-xl border border-gray-200/60 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                  required
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" required />
                I agree to be contacted about my request.
              </label>

              <button
                type="submit"
                className="bg-green-300 hover:bg-green-400 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
