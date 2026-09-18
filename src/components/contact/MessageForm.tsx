/**
 * Netlify Forms. The markup is in the static HTML, so Netlify detects it at deploy time.
 * Honeypot field "bot-field" filters spam; a successful submit lands on /contact/thanks/.
 */
export function MessageForm() {
  const field =
    "w-full rounded-[2px] border border-bone/15 bg-soot px-4 py-3 text-bone placeholder:text-bone/30 focus:border-lantern/60 focus:outline-none focus:ring-2 focus:ring-lantern/30";
  return (
    <form
      name="contact"
      method="POST"
      action="/contact/thanks/"
      data-netlify="true"
      // @ts-expect-error Netlify attribute
      netlify-honeypot="bot-field"
      className="surface rounded-[2px] p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <p className="label-mono text-lantern">Send a message</p>
      <p className="mt-2 text-bone/70">Group rates, lost and found, press, or anything the FAQ didn’t cover.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-mono text-bone/50">Name</span>
          <input type="text" name="name" required autoComplete="name" className={`mt-2 ${field}`} />
        </label>
        <label className="block">
          <span className="label-mono text-bone/50">Email</span>
          <input type="email" name="email" required autoComplete="email" className={`mt-2 ${field}`} />
        </label>
        <label className="block sm:col-span-2">
          <span className="label-mono text-bone/50">Message</span>
          <textarea name="message" required rows={5} className={`mt-2 ${field}`} />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="label-mono inline-flex rounded-[2px] bg-blaze px-6 py-3.5 text-bone lantern-glow hover:bg-blaze-deep">
          Send message
        </button>
        <p className="text-[0.875rem] text-bone/50">We reply from the inbox above, usually within a day during the season.</p>
      </div>
    </form>
  );
}
