import { useEffect, useRef, useState } from "react";
import { portfolio } from "./data/portfolio";
import {
  getContactLinks,
  getSections,
  hasText,
  namedItems,
  resolveAction,
  safeUrl,
  sectionIds,
  skillGroups,
} from "./lib/portfolio";
import Icon from "./components/Icon";
import "./App.css";

function Action({ action, secondary = false }) {
  if (!action) return null;
  return (
    <a
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={action.href}
    >
      {action.label}
      <Icon name={secondary ? "external" : "arrow"} />
    </a>
  );
}

function SectionHeading({ data, number, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-number">{number}</span>
        {data?.eyebrow}
      </p>
      <h2 id={id}>
        {data?.title}
        {data?.accent && (
          <>
            {" "}
            <span>{data.accent}</span>
          </>
        )}
      </h2>
      {data?.description && (
        <p className="section-description">{data.description}</p>
      )}
    </div>
  );
}

function Photo({ photo, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!safeUrl(photo?.src) || failed) return null;
  return (
    <figure className={className}>
      <img
        src={photo.src}
        alt={photo.alt ?? ""}
        style={{ objectPosition: photo.position }}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

function Header({ data, sections }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    const breakpoint = window.matchMedia("(min-width: 960px)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    breakpoint.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      breakpoint.removeEventListener("change", close);
    };
  }, [open]);
  const links = Object.keys(data.ui.nav).filter(
    (key) => sections[key] && sectionIds[key],
  );
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)}>
          <span className="brand-monogram">{data.monogram}</span>
          <span>
            {data.firstName} {data.lastName}
          </span>
        </a>
        {links.length > 0 && (
          <>
            <button
              ref={buttonRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="main-navigation"
              aria-label={open ? data.ui.menuClose : data.ui.menuOpen}
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
            <nav
              id="main-navigation"
              className={`navigation ${open ? "is-open" : ""}`}
              aria-label={data.ui.navigationLabel}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget) &&
                  event.relatedTarget !== buttonRef.current
                )
                  setOpen(false);
              }}
            >
              {links.map((key) => (
                <a
                  key={key}
                  className={key === "contact" ? "nav-contact" : ""}
                  href={`#${sectionIds[key]}`}
                  onClick={() => setOpen(false)}
                >
                  {data.ui.nav[key]}
                  {key === "contact" && <Icon name="external" />}
                </a>
              ))}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

function JourneyList({ items, label, id }) {
  return (
    <div id={id} className="journey-column">
      <h3 className="column-title">{label}</h3>
      <div className="timeline">
        {namedItems(items).map((item, index) => (
          <article className="timeline-item" key={item.id ?? index}>
            <span className="timeline-dot" />
            <p className="period">{item.period}</p>
            <h4>{item.title}</h4>
            <p className="institution">{item.institution}</p>
            {item.description && (
              <p className="body-copy">{item.description}</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function App({ data = portfolio }) {
  const sections = getSections(data);
  const contacts = getContactLinks(data);
  const contact = contacts[0];
  const order = [
    "about",
    "services",
    "projects",
    "journey",
    "skills",
    "contact",
  ].filter((key) => sections[key]);
  const number = (key) => String(order.indexOf(key) + 1).padStart(2, "0");
  const theme = Object.fromEntries(
    Object.entries(data.theme ?? {}).map(([key, value]) => [
      `--${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`,
      value,
    ]),
  );
  const cv = safeUrl(data.cv?.url) && data.cv?.label ? data.cv : null;
  const credit = data.settings?.credit;
  return (
    <div style={theme} className="portfolio" id="inicio">
      <a className="skip-link" href="#contenido">
        {data.ui.skipLink}
      </a>
      <Header data={data} sections={sections} />
      <main id="contenido" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="small-line" />
              {data.hero?.eyebrow}
            </p>
            <p className="hero-greeting">{data.hero?.greeting}</p>
            <h1 id="hero-title">
              {(Array.isArray(data.hero?.headline)
                ? data.hero.headline
                : [data.hero?.headline]
              )
                .filter(hasText)
                .map((line, index) => (
                  <span
                    className={index === data.hero.accentLine ? "accent" : ""}
                    key={index}
                  >
                    {line}
                  </span>
                ))}
            </h1>
            <p className="hero-description">{data.hero?.description}</p>
            <div className="hero-actions">
              <Action
                action={resolveAction(data.hero?.primaryAction, sections)}
              />
              <Action
                action={resolveAction(data.hero?.secondaryAction, sections)}
                secondary
              />
            </div>
          </div>
          <aside className="profile-card">
            <div className="profile-card-top">
              <span className="profile-monogram">{data.monogram}</span>
              <Icon name="compass" />
            </div>
            {data.photo?.src && (
              <Photo
                key={data.photo.src}
                photo={data.photo}
                className="profile-photo"
              />
            )}
            <div className="profile-identity">
              <h2>
                {data.firstName}
                <br />
                {data.lastName}
                <span className="profile-period">.</span>
              </h2>
              <p>{data.profession}</p>
            </div>
            <div className="profile-card-bottom">
              {data.location && (
                <p>
                  <Icon name="pin" />
                  {data.location}
                </p>
              )}
              {data.hero?.availability && (
                <p>
                  <span className="status-dot" />
                  {data.hero.availability}
                </p>
              )}
              {cv && (
                <a className="cv-link" href={cv.url}>
                  {cv.label}
                  <Icon name="download" />
                </a>
              )}
            </div>
          </aside>
          <div className="hero-baseline">
            {sections.about && data.hero?.scrollLabel && (
              <a href={`#${sectionIds.about}`}>
                <Icon name="down" />
                {data.hero.scrollLabel}
              </a>
            )}
            <span>{data.profession}</span>
          </div>
        </section>

        {sections.about && (
          <section
            className="section shell about-section"
            id={sectionIds.about}
            aria-labelledby="about-title"
          >
            <div>
              <SectionHeading
                data={data.about}
                number={number("about")}
                id="about-title"
              />
              {data.about.photo?.src && (
                <Photo
                  key={data.about.photo.src}
                  photo={data.about.photo}
                  className="about-photo"
                />
              )}
            </div>
            <div className="about-content">
              {data.about.intro && (
                <p className="about-intro">{data.about.intro}</p>
              )}
              {data.about.paragraphs?.filter(hasText).map((text, index) => (
                <p className="body-copy" key={index}>
                  {text}
                </p>
              ))}
              {data.about.facts?.some((fact) => hasText(fact?.value)) && (
                <dl className="facts">
                  {data.about.facts
                    .filter((fact) => hasText(fact?.value))
                    .map((fact, index) => (
                      <div key={index}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                </dl>
              )}
            </div>
          </section>
        )}

        {sections.services && (
          <section
            className="section section-tint"
            id={sectionIds.services}
            aria-labelledby="services-title"
          >
            <div className="shell">
              <SectionHeading
                data={data.services}
                number={number("services")}
                id="services-title"
              />
              <div className="services-grid grid gap-5 md:grid-cols-3">
                {namedItems(data.services.items).map((item, index) => (
                  <article className="service-card" key={item.id ?? index}>
                    <div className="service-top">
                      <span className="service-icon">
                        <Icon name={item.icon} />
                      </span>
                      <span className="item-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3>{item.name}</h3>
                    <p className="body-copy">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {sections.projects && (
          <section
            className="section shell"
            id={sectionIds.projects}
            aria-labelledby="projects-title"
          >
            <SectionHeading
              data={data.projects}
              number={number("projects")}
              id="projects-title"
            />
            <div className="project-list">
              {namedItems(data.projects.items).map((item, index) => (
                <article className="project-row" key={item.id ?? index}>
                  <span className="item-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="project-title">
                    <p className="project-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    {item.image?.src && (
                      <Photo
                        key={item.image.src}
                        photo={item.image}
                        className="project-image"
                      />
                    )}
                  </div>
                  <p className="body-copy">{item.description}</p>
                  <div className="project-end">
                    <span>{item.year}</span>
                    {safeUrl(item.url) && (
                      <a
                        href={item.url}
                        aria-label={`${data.ui.projectLink ?? item.name} — ${item.name}`}
                      >
                        <Icon name="external" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {sections.journey && (
          <section
            className="section section-tint"
            id={sectionIds.journey}
            aria-labelledby="journey-title"
          >
            <div className="shell">
              <SectionHeading
                data={data.journey}
                number={number("journey")}
                id="journey-title"
              />
              <div
                className={`journey-grid grid gap-12 ${sections.experience && sections.education ? "md:grid-cols-2" : ""}`}
              >
                {sections.experience && (
                  <JourneyList
                    items={data.experience}
                    label={data.ui.experience}
                    id={sectionIds.experience}
                  />
                )}
                {sections.education && (
                  <JourneyList
                    items={data.education}
                    label={data.ui.education}
                    id={sectionIds.education}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {sections.skills && (
          <section
            className="section shell"
            id={sectionIds.skills}
            aria-labelledby="skills-title"
          >
            <SectionHeading
              data={data.skills}
              number={number("skills")}
              id="skills-title"
            />
            <div className="skills-grid grid gap-8 md:grid-cols-3">
              {skillGroups(data).map((group, index) => (
                <div className="skill-group" key={index}>
                  <h3>{group.name}</h3>
                  <ul className="skill-tags">
                    {group.items.filter(hasText).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {sections.contact && (
          <section
            className="contact-section shell"
            id={sectionIds.contact}
            aria-labelledby="contact-title"
          >
            <div className="contact-panel">
              <div>
                <p className="eyebrow">
                  <span className="section-number">{number("contact")}</span>
                  {data.contact?.eyebrow}
                </p>
                <h2 id="contact-title">
                  {data.contact?.title}
                  <br />
                  <span>{data.contact?.accent}</span>
                </h2>
                <p className="contact-description">
                  {data.contact?.description}
                </p>
                {contact && (
                  <a className="button button-light" href={contact.url}>
                    {data.contact?.cta || contact.label}
                    <Icon name="arrow" />
                  </a>
                )}
              </div>
              <div className="contact-details">
                <Icon name="mail" className="contact-icon" />
                <div className="contact-links">
                  {contacts.map((link, index) => (
                    <a key={index} href={link.url}>
                      {link.label}
                      <Icon name="external" />
                    </a>
                  ))}
                </div>
                {data.contact?.note && <p>{data.contact.note}</p>}
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="site-footer shell">
        <div className="footer-top">
          <a className="footer-name" href="#inicio">
            {data.firstName} {data.lastName}
            <span>{data.profession}</span>
          </a>
          <a className="back-top" href="#inicio">
            {data.ui.backToTop}
            <Icon name="arrow" />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {data.firstName} {data.lastName}.{" "}
            {data.ui.rights}
          </p>
          {credit?.enabled && (
            <p>
              {credit.label}{" "}
              {safeUrl(credit.url) ? (
                <a href={credit.url}>{credit.name}</a>
              ) : (
                <span>{credit.name}</span>
              )}
            </p>
          )}
        </div>
        {data.settings?.demoNotice && (
          <p className="demo-notice">{data.settings.demoNotice}</p>
        )}
      </footer>
    </div>
  );
}
