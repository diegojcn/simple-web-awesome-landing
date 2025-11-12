import { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Card, ButtonGroup, ToggleButton, Form } from "react-bootstrap";
import logo from "./assets/s4t-logo.webp";


const PLAY_URL =
  "https://play.google.com/store/apps/details?id=br.com.safefortalk.android";
const CAMPAIGN = "utm_source=landing&utm_medium=cta&utm_campaign=v3";
const PLAY_URL_UTM = `${PLAY_URL}&${CAMPAIGN}`;

const HEADLINES = [
  "Speak confidently in any language.",
  "Your voice deserves to be heard.",
  "Practice languages with real people — safely.",
];

export default function App() {
  const [variant] = useState(() => Math.floor(Math.random() * HEADLINES.length));

  const drawerRef = useRef<any>(null);

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header?.classList.add('sticky-active');
      } else {
        header?.classList.remove('sticky-active');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll("section, footer")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  // Smart install link
  const installHref = useMemo(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/android|huawei|xiaomi|samsung|pixel/.test(ua)) return PLAY_URL_UTM;
    return PLAY_URL_UTM;
  }, []);

  // Popover API usage
  useEffect(() => {
    const tip = document.getElementById("install-tip") as HTMLDivElement | null;
    if (!tip) return;
    const root = document.getElementById("root")!;
    const onHover = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(".cta-install")) (tip as any).showPopover?.();
    };
    const onClick = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.hasAttribute("data-close-popover")) (tip as any).hidePopover?.();
    };
    root.addEventListener("pointerover", onHover, { once: true });
    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("pointerover", onHover);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <main className="landing-wrap">

      {/* HEADER */}
      <header className="header wrapper" id="top">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} width="40" height="40" alt="Safe 4 Talk logo" />
          <span>Safe 4 Talk</span>
        </a>

        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="actions">
          <wa-button
            class="cta-install"
            size="small"
            variant="brand"
            href={installHref}
            target="_blank"
          >
            <wa-icon name="google-play" family="brands"></wa-icon>&nbsp;Install
          </wa-button>

          <wa-button
            size="small"
            appearance="outline"
            onClick={() => {
              const drawer = document.getElementById('qrDrawer');
              (drawer as any)?.show?.();
            }}
          >
            <wa-icon name="qrcode" label="QR"></wa-icon>&nbsp;Scan
          </wa-button>
        </div>
      </header>


      {/* HERO */}
      <section id="top" className="hero | wrapper">
        <div className="hero__content">
          <h1>{HEADLINES[variant]}</h1>
          <p className="lede">
            The easiest way to practice speaking and connect with real people.
            Voice-first. Ad-free. Safe.
          </p>

          <div className="actions">
            <wa-button
              class="cta-install"
              size="large"
              variant="brand"
              href={installHref}
              target="_blank"
            >
              <wa-icon name="download" label="Download" />
              &nbsp;Get it on Google Play
            </wa-button>

            <wa-button
              size="large"
              appearance="outline"
              popovertarget="install-tip"
              href="#how"
            >
              <wa-icon name="info-circle" label="Info" />
              &nbsp;How it works
            </wa-button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="phone-mock">
            <img src="./phone.svg" />
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section id="how" className="how wrapper">
        <h2 className="how-title">How it works</h2>
        <p className="how-subtitle">Three simple steps to start speaking confidently</p>

        <div className="how-grid">
          <wa-card class="how-card">
            <div className="how-step">
              <wa-icon name="target" size="large" label="Goal"></wa-icon>
              <div>
                <h4>1) Set your goal</h4>
                <p>Choose your language and how much time you want to practice daily.</p>
                <wa-rating value="5" readonly></wa-rating>
              </div>
            </div>
          </wa-card>

          <wa-card class="how-card">
            <div className="how-step">
              <wa-icon name="message-circle" size="large" label="Conversation"></wa-icon>
              <div>
                <h4>2) Match & talk</h4>
                <p>Join a room or match 1:1 instantly. Voice-only for real, safe practice.</p>
                <wa-tooltip content="Works even on slow connections">
                  <wa-icon name="wifi" />
                </wa-tooltip>
              </div>
            </div>
          </wa-card>

          <wa-card class="how-card">
            <div className="how-step">
              <wa-icon name="bar-chart-3" size="large" label="Progress"></wa-icon>
              <div>
                <h4>3) Track progress</h4>
                <p>Build streaks and see your improvement grow week after week.</p>
                <wa-progress-ring value="72" />
              </div>
            </div>
          </wa-card>
        </div>
      </section>


      {/* FEATURES */}
      <section id="features" className="features wrapper">
        <h2 className="features-title">Why you’ll love it</h2>

        <div className="feature-grid">
          <wa-card class="feature-card">
            <div className="feature-icon">
              <wa-icon name="shield" label="Safety"></wa-icon>
            </div>
            <h3>Safe & respectful</h3>
            <p>Controls for mute, report, and room safety — peace of mind first.</p>
          </wa-card>

          <wa-card class="feature-card">
            <div className="feature-icon">
              <wa-icon name="users" label="Community"></wa-icon>
            </div>
            <h3>Real people, real talk</h3>
            <p>Instant rooms and 1:1 matches help you actually speak, not just type.</p>
          </wa-card>

          <wa-card class="feature-card">
            <div className="feature-icon">
              <wa-icon name="bolt" label="Progress"></wa-icon>
            </div>
            <h3>Progress that feels good</h3>
            <p>Streaks, levels, and feedback that make daily practice a habit.</p>
          </wa-card>
        </div>
      </section>


      {/* SOCIAL PROOF */}
      <section id="reviews" className="reviews wrapper">
        <h2 className="reviews-title">What learners say</h2>
        <p className="reviews-subtitle">Thousands of people practice safely every day — here’s what they’re saying.</p>

        <div className="review-cards">
          <wa-card class="review-card">
            <div className="review-icon">
              <wa-icon name="quote-left" label="quote"></wa-icon>
            </div>
            <blockquote>“The only app that actually makes me speak daily.”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
            <small>— Sofia, 🇧🇷</small>
          </wa-card>

          <wa-card class="review-card">
            <div className="review-icon">
              <wa-icon name="quote-left" label="quote"></wa-icon>
            </div>
            <blockquote>“It feels like having a friend group for learning.”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
            <small>— Miguel, 🇪🇸</small>
          </wa-card>

          <wa-card class="review-card">
            <div className="review-icon">
              <wa-icon name="quote-left" label="quote"></wa-icon>
            </div>
            <blockquote>“Finally, a safe voice space to practice!”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
            <small>— Aiko, 🇯🇵</small>
          </wa-card>
        </div>
      </section>

      {/* FAQ with interactive motion */}
      <section id="faq" className="faq wrapper">
        <h2 className="faq-title">FAQ</h2>
        <p className="faq-subtitle">Got questions? We’ve got quick answers below.</p>

        <div className="faq-list">
          <details className="faq-item" open>
            <summary>
              <wa-icon name="circle-help" size="small" />&nbsp;Is Safe 4 Talk free?
            </summary>
            <div className="faq-body">
              <p>Yes. 100% free. No ads, no hidden fees — just real conversations.</p>
             
            </div>
          </details>

          <details className="faq-item">
            <summary>
              <wa-icon name="user" size="small" />&nbsp;Do I need to show my face?
            </summary>
            <div className="faq-body">
              <p>No. Voice-first rooms are the default — speak freely without showing your face.</p>
            </div>
          </details>

          <details className="faq-item">
            <summary>
              <wa-icon name="shield-check" size="small" />&nbsp;What about safety?
            </summary>
            <div className="faq-body">
              <p>Mute, block, report, and room controls keep it respectful and safe for all users.</p>
            </div>
          </details>

          <details className="faq-item">
            <summary>
              <wa-icon name="globe" size="small" />&nbsp;Which languages can I practice?
            </summary>
            <div className="faq-body">
              <p>English, Portuguese, Spanish, Japanese, and more coming soon!</p>
            </div>
          </details>
        </div>
      </section>


      {/* CTA */}
      <section className="cta-bar">
        <div className="cta-content wrapper">
          <h3>Ready to start speaking?</h3>
          <p>Join thousands already practicing new languages — free, fun, and safe.</p>
          <wa-button
            class="cta-install"
            size="large"
            variant="brand"
            href={installHref}
            target="_blank"
          >
            <wa-icon name="download" label="Play Store" />&nbsp;Download Free
          </wa-button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer wrapper">
        <div className="footer-left">
          <img src={logo} width="28" height="28" alt="Safe 4 Talk logo" />
          <span>© {new Date().getFullYear()} Safe 4 Talk</span>
        </div>
        <div className="footer-links">
          <a href="https://safe4talk.com/" target="_blank" rel="noreferrer">Website</a>
          <a href={PLAY_URL} target="_blank" rel="noreferrer">Google Play</a>
        </div>
      </footer>

      {/* Drawer for QR */}
      <wa-drawer
        id="qrDrawer"
        label="Install via QR"
        light-dismiss
        placement="right"
        style={{
          '--drawer-width': '320px',
          '--drawer-transition': 'transform 0.35s ease, opacity 0.35s ease',
        }}
        ref={drawerRef}
      >
        <div className="qr-content">
          <p>Scan with your phone to open Google Play.</p>
          <div className="qr-wrap">
            <wa-qr-code value={PLAY_URL_UTM} size="180" radius="0.2"></wa-qr-code>
          </div>
        </div>

        <wa-button
          slot="footer"
          variant="brand"
          onClick={() => {
            const drawer = document.getElementById('qrDrawer');
            (drawer as any)?.hide?.();
          }}
        >
          Close
        </wa-button>
      </wa-drawer>


    </main>
  );
}
