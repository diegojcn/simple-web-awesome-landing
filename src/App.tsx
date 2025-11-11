import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/s4t-logo.svg";

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
  const [highContrast, setHighContrast] = useState(false);
  const drawerRef = useRef<any>(null);

  // Theme restore
  useEffect(() => {
    const saved = localStorage.getItem("highContrast");
    const enabled = saved === "1";
    setHighContrast(enabled);
    if (enabled)
      document.documentElement.setAttribute("data-theme", "high-contrast");
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
    <main>
      {/* HEADER */}
      <header className="header | wrapper">
        <a className="brand" href="#top" aria-label="Safe 4 Talk home">
          <img src={logo} width="40" height="40" alt="" />
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
            <wa-icon name="google-play" label="Google Play"></wa-icon>Install
          </wa-button>
          <wa-button
            size="small"
            appearance="outline"
            onClick={() => {
              const drawer = document.querySelector('wa-drawer');
              (drawer as any)?.show?.();
            }}
          >
            <wa-icon name="qr-code" label="QR"></wa-icon>
            Scan
          </wa-button>

          <wa-switch
            id="high-contrast"
            checked={highContrast}
            aria-label="Toggle high contrast"
            onChange={(e: any) => {
              const enabled = Boolean(e.target.checked);
              setHighContrast(enabled);
              if (enabled) {
                document.documentElement.setAttribute(
                  "data-theme",
                  "high-contrast"
                );
                localStorage.setItem("highContrast", "1");
              } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("highContrast", "0");
              }
            }}
          ></wa-switch>
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

          <div className="cta-group">
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

            <wa-button size="large" appearance="outline" popovertarget="install-tip">
              <wa-icon name="info-circle" label="Info" />
              &nbsp;How it works
            </wa-button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="phone-mock">
            <img src="./phone.svg"  />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features | wrapper">
        <h2>Why you’ll love it</h2>
        <div className="feature-grid">
          <wa-card>
            <wa-icon name="shield" slot="header" />
            <h3>Safe & respectful</h3>
            <p>Controls for mute, report, and room safety — peace of mind first.</p>
          </wa-card>
          <wa-card>
            <wa-icon name="users" slot="header" />
            <h3>Real people, real talk</h3>
            <p>Instant rooms and 1:1 matches help you actually speak, not just type.</p>
          </wa-card>
          <wa-card>
            <wa-icon name="bolt" slot="header" />
            <h3>Progress that feels good</h3>
            <p>Streaks, levels, and feedback that make daily practice a habit.</p>
          </wa-card>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="reviews" className="reviews | wrapper">
        <h2>What learners say</h2>
        <div className="review-cards">
          <wa-card>
            <blockquote>“The only app that actually makes me speak daily.”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
          </wa-card>
          <wa-card>
            <blockquote>“It feels like having a friend group for learning.”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
          </wa-card>
          <wa-card>
            <blockquote>“Finally, a safe voice space to practice!”</blockquote>
            <wa-rating value="5" readonly></wa-rating>
          </wa-card>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-bar">
        <div className="wrapper">
          <h3>Ready to start speaking?</h3>
          <wa-button
            class="cta-install"
            size="large"
            variant="brand"
            href={installHref}
            target="_blank"
          >
            <wa-icon name="google-play" label="Play Store" />&nbsp;Download Free
          </wa-button>
        </div>
      </section>

      

      {/* FOOTER */}
      <footer className="footer | wrapper">
        <img src={logo} width="28" height="28" alt="" />
        <span>© {new Date().getFullYear()} Safe 4 Talk</span>
        <div className="spacer" />
        <a href="https://safe4talk.com/" target="_blank" rel="noreferrer">
          Website
        </a>
        <a href={PLAY_URL} target="_blank" rel="noreferrer">
          Google Play
        </a>
      </footer>

      {/* Drawer for QR */}
      <wa-drawer label="Install via QR" light-dismiss ref={drawerRef as any}>
        <p>Scan with your phone to open Google Play.</p>
        <div className="qr-wrap">
          <wa-qr-code value={PLAY_URL_UTM} size="160" radius="0.2"></wa-qr-code>
        </div>
        <wa-button slot="footer" variant="brand" data-drawer="close">
          Close
        </wa-button>
      </wa-drawer>
      {/* <wa-drawer class="custom-drawer" label="Install via QR" light-dismiss>
        <p>Scan with your phone to open Google Play.</p>
        <div className="qr-wrap">
          <wa-qr-code value={PLAY_URL_UTM} size="160" radius="0.2"></wa-qr-code>
        </div>
        <wa-button
          slot="footer"
          variant="brand"
          onClick={() => {
            const drawer = document.querySelector("wa-drawer");
            drawer?.classList.remove("drawer-visible");
            setTimeout(() => {
              drawer?.setAttribute("hidden", "");
              drawer?.style.removeProperty("display");
            }, 400);
          }}
        >
          Close
        </wa-button>
      </wa-drawer> */}
    </main>
  );
}
