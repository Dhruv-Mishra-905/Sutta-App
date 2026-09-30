import { useState } from 'react'
import '../PagesCss/LandingPage.css'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const LandingPage = () => {
  const [mode, setMode] = useState('signup')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', text: '' })
  const isSignUp = mode === 'signup'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback({ type: '', text: '' })

    if (!isSupabaseConfigured || !supabase) {
      setFeedback({
        type: 'error',
        text: 'Add your Supabase URL and anon key to .env.local to enable authentication.',
      })
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const fullName = formData.get('fullName')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    setIsSubmitting(true)

    try {
      const result = isSignUp
        ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        })
        : await supabase.auth.signInWithPassword({ email, password })

      if (result.error) throw result.error

      setFeedback({
        type: 'success',
        text: isSignUp
          ? result.data.session
            ? 'Your account is ready. Welcome to Sutta-App.'
            : 'Check your inbox for a confirmation link to finish creating your account.'
          : 'You are signed in. Welcome back.',
      })
      if (isSignUp) form.reset()
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="sutta-page">
      <aside className="visual-panel" aria-label="Sutta-App introduction">
        <img className="visual-background" src="/cigarette-still-life.jpg" alt="Five cigarettes arranged side by side" />
        <div className="visual-shade" />
        <a className="brand-lockup" href="#top" aria-label="Sutta-App home">
          <span className="brand-symbol" aria-hidden="true">S</span>
          <span>Sutta<span className="brand-dash">-</span>App</span>
        </a>
        <div className="editorial-copy">
          <p className="visual-kicker">MADE FOR YOUR ADDA</p>
          <h1>Apne log.<br />Apni baatein.</h1>
          <p>Bring your gang together. Chai ho ya late-night plans, the adda is always open.</p>
        </div>
        <figure className="photo-inset">
          <img src="/marlboro-pack.jpg" alt="Marlboro cigarette pack on a plain background" />
          <figcaption>Marlboro · US duty-free pack</figcaption>
        </figure>
        <div className="photo-credits">
          <a href="https://commons.wikimedia.org/wiki/File:5_cigarettes_in_a_row.jpg" target="_blank" rel="noreferrer">
            Photo: European Commission, CC BY 4.0
          </a>
          <a href="https://commons.wikimedia.org/wiki/File:Marlboro_cigarette_pack_(2010)_from_US_duty-free_shop_without_any_warnings_etc._(edited,_white_background).jpg" target="_blank" rel="noreferrer">
            Marlboro pack: Pittigrilli, CC BY-SA 3.0
          </a>
        </div>
      </aside>

      <section className="auth-panel" id="top" aria-labelledby="auth-title">
        <div className="auth-content">
          <div className="auth-mode" aria-label="Account access">
            <button
              className={isSignUp ? 'selected' : ''}
              type="button"
              aria-pressed={isSignUp}
              onClick={() => { setMode('signup'); setFeedback({ type: '', text: '' }) }}
            >
              Naya account
            </button>
            <button
              className={!isSignUp ? 'selected' : ''}
              type="button"
              aria-pressed={!isSignUp}
              onClick={() => { setMode('signin'); setFeedback({ type: '', text: '' }) }}
            >
              Sign in
            </button>
          </div>
          <p className="auth-kicker">YOUR PEOPLE, ALL IN ONE PLACE</p>
          <h2 id="auth-title">{isSignUp ? 'Join the adda.' : 'Aao, wapas.'}</h2>
          <p className="auth-intro">
            {isSignUp ? 'Apna account banao. Your people are just a hello away.' : 'Sign in and pick up right where your gang left off.'}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label className="form-field" htmlFor="fullName">
                <span>Naam</span>
                <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="What do your friends call you?" required />
              </label>
            )}
            <label className="form-field" htmlFor="email">
              <span>Email address</span>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label className="form-field" htmlFor="password">
              <span>Password</span>
              <span className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  minLength={8}
                  placeholder="At least 8 characters"
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>
            {feedback.text && (
              <p className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
                {feedback.text}
              </p>
            )}
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Bas ek pal...' : isSignUp ? 'Apna account banao' : 'Sign in'}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-note">Good vibes, real people. Keep your adda welcoming for everyone.</p>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
