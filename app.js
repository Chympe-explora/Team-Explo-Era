/* Krem Chympe — Home page only.
   Rebuilt as a single-page site: Home (introduction), Destinations
   (Krem Chympe Waterfall & Cave, Wilderness Expedition), Experiences,
   Booking (empty — fill in later), About Us (empty — fill in later).
   All content/photos live in config.js — this file is the engine room.
*/
(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState;

  var CONTENT = window.KC_CONTENT || {};

  // ---------------------------------------------------------------------
  // Icons (lucide-style inline SVGs)
  // ---------------------------------------------------------------------
  function makeIcon(paths) {
    return function (props) {
      props = props || {};
      var size = props.size || 24;
      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: props.className || ""
        },
        paths.map(function (p, i) {
          return h(p[0], Object.assign({ key: i }, p[1]));
        })
      );
    };
  }

  var Menu = makeIcon([["line", { x1: 4, x2: 20, y1: 12, y2: 12 }], ["line", { x1: 4, x2: 20, y1: 6, y2: 6 }], ["line", { x1: 4, x2: 20, y1: 18, y2: 18 }]]);
  var X = makeIcon([["path", { d: "M18 6 6 18" }], ["path", { d: "m6 6 12 12" }]]);
  var ArrowRight = makeIcon([["path", { d: "M5 12h14" }], ["path", { d: "m12 5 7 7-7 7" }]]);
  var Mountain = makeIcon([["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }]]);

  // ---------------------------------------------------------------------
  // Shared little components
  // ---------------------------------------------------------------------
  function GlassCard(props) {
    return h(
      "div",
      { className: "backdrop-blur-[24px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] " + (props.className || "") },
      props.children
    );
  }

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function App() {
    var menuState = useState(false); var mobileMenuOpen = menuState[0], setMobileMenuOpen = menuState[1];

    var navItems = (CONTENT.nav && CONTENT.nav.items) || [
      { label: "Home", id: "home" },
      { label: "Destinations", id: "destinations" },
      { label: "Experiences", id: "experiences" },
      { label: "Booking", id: "booking" },
      { label: "About Us", id: "about" }
    ];

    function goTo(id) {
      setMobileMenuOpen(false);
      scrollToId(id);
    }

    // ---- Header ----------------------------------------------------
    var header = h(
      "header", { className: "sticky top-0 z-40 p-3 md:p-4" },
      h(
        GlassCard, { className: "max-w-[1280px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between" },
        h(
          "div", { className: "flex items-center gap-3 cursor-pointer", onClick: function () { goTo("home"); } },
          CONTENT.logoImage
            ? h("img", { src: CONTENT.logoImage, className: "w-9 h-9 rounded-full object-cover border border-white/20" })
            : h("div", { className: "w-9 h-9 rounded-full bg-[#2E8B57] flex items-center justify-center" }, h(Mountain, { size: 18 })),
          h(
            "div", { className: "leading-tight" },
            h("div", { className: "font-bold tracking-[0.12em] text-[13px]" }, CONTENT.siteName),
            h("div", { className: "text-[10px] tracking-[0.18em] text-white/70 -mt-0.5" }, CONTENT.siteSub)
          )
        ),
        h(
          "nav", { className: "hidden md:flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1.5 backdrop-blur-xl" },
          navItems.map(function (item) {
            return h("button", {
              key: item.id,
              onClick: function () { goTo(item.id); },
              className: "px-4 py-1.5 rounded-full text-[13px] transition text-white/80 hover:text-white hover:bg-white/10"
            }, item.label);
          })
        ),
        h(
          "div", { className: "flex items-center gap-2" },
          h("button", { onClick: function () { goTo("booking"); }, className: "hidden md:block bg-[#2E8B57] hover:bg-[#257a4b] px-5 py-2 rounded-full text-sm font-medium transition" }, "Book Now"),
          h("button", { onClick: function () { setMobileMenuOpen(!mobileMenuOpen); }, className: "md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center" }, mobileMenuOpen ? h(X, { size: 18 }) : h(Menu, { size: 18 }))
        )
      ),
      mobileMenuOpen && h(
        GlassCard, { className: "md:hidden mt-3 p-4 max-w-[1280px] mx-auto space-y-2" },
        navItems.map(function (item) {
          return h("button", {
            key: item.id,
            onClick: function () { goTo(item.id); },
            className: "w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10"
          }, item.label);
        }),
        h("button", { onClick: function () { goTo("booking"); }, className: "w-full bg-[#2E8B57] py-3 rounded-full font-medium" }, "Book Now")
      )
    );

    // ---- Home / introduction ----------------------------------------
    var HERO = CONTENT.hero || { badge: "", title: "", sub: "" };
    var home = h(
      "section", { id: "home", className: "scroll-mt-24" },
      h(
        GlassCard, { className: "p-8 md:p-12" },
        HERO.badge && h("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] tracking-widest" }, HERO.badge),
        h("h1", { className: "mt-6 text-[32px] md:text-[56px] font-bold leading-[0.95] tracking-tight max-w-[720px]" }, HERO.title),
        h("p", { className: "mt-5 text-white/70 text-[15px] leading-relaxed max-w-[600px]" }, HERO.sub),
        h(
          "div", { className: "mt-8 flex flex-wrap gap-3" },
          h("button", { onClick: function () { goTo("destinations"); }, className: "bg-[#2E8B57] hover:bg-[#257a4b] px-7 py-3 rounded-full text-sm font-semibold flex items-center gap-2" }, "Explore Destinations ", h(ArrowRight, { size: 16 }))
        )
      )
    );

    // ---- Destinations -------------------------------------------------
    var DEST = CONTENT.destinations || { title: "Destinations", subtitle: "", items: [] };
    var destinations = h(
      "section", { id: "destinations", className: "scroll-mt-24" },
      h(
        "div", { className: "mb-4 md:mb-6" },
        h("h2", { className: "text-2xl md:text-3xl font-bold tracking-tight" }, DEST.title),
        DEST.subtitle && h("p", { className: "mt-1 text-white/60 text-sm" }, DEST.subtitle)
      ),
      h(
        "div", { className: "grid md:grid-cols-2 gap-6" },
        (DEST.items || []).map(function (d) {
          return h(
            GlassCard, { key: d.id, id: "dest-" + d.id, className: "overflow-hidden flex flex-col" },
            d.image && h("img", { src: d.image, className: "w-full h-[220px] object-cover" }),
            h(
              "div", { className: "p-6 flex flex-col flex-1" },
              h("h3", { className: "text-lg font-semibold" }, d.name),
              h("p", { className: "mt-3 text-white/70 text-sm leading-relaxed flex-1" }, d.description),
              h("button", { onClick: function () { if (d.link) { window.location.href = d.link; } else { goTo("booking"); } }, className: "mt-6 w-full bg-[#2E8B57] hover:bg-[#257a4b] py-3 rounded-full text-sm font-semibold" }, d.buttonLabel || "Book Now")
            )
          );
        })
      )
    );

    // ---- Experiences — grouped by destination --------------------------
    var EXP = CONTENT.experiences || { title: "Experiences", subtitle: "", groups: [] };
    function experienceGroup(group, gi) {
      return h(
        "div", { key: gi, className: gi > 0 ? "mt-10" : "" },
        h("h3", { className: "text-base md:text-lg font-semibold text-white/90" }, group.name),
        h(
          "div", { className: "mt-4 grid md:grid-cols-3 gap-5" },
          (group.items || []).map(function (item, i) {
            return h(
              GlassCard, { key: i, className: "overflow-hidden" },
              item.image && h("img", { src: item.image, className: "w-full h-[140px] object-cover" }),
              h(
                "div", { className: "p-5" },
                h("h4", { className: "font-semibold text-[15px]" }, item.title),
                item.description && h("p", { className: "mt-2 text-white/70 text-sm leading-relaxed" }, item.description)
              )
            );
          })
        )
      );
    }
    var experiences = h(
      "section", { id: "experiences", className: "scroll-mt-24" },
      h(
        "div", { className: "mb-4 md:mb-6" },
        h("h2", { className: "text-2xl md:text-3xl font-bold tracking-tight" }, EXP.title),
        EXP.subtitle && h("p", { className: "mt-1 text-white/60 text-sm" }, EXP.subtitle)
      ),
      (EXP.groups || []).map(experienceGroup)
    );

    // ---- Booking (empty — to fill in later) ----------------------------
    var BOOKING = CONTENT.booking || { title: "Booking" };
    var booking = h(
      "section", { id: "booking", className: "scroll-mt-24" },
      h(
        GlassCard, { className: "p-8 md:p-12" },
        h("h2", { className: "text-2xl md:text-3xl font-bold tracking-tight" }, BOOKING.title),
        h("div", { className: "mt-6 border border-dashed border-white/20 rounded-2xl p-8 text-center text-white/40 text-sm" }, "Content coming soon")
      )
    );

    // ---- About Us (empty — to fill in later) ----------------------------
    var ABOUT = CONTENT.about || { title: "About Us" };
    var about = h(
      "section", { id: "about", className: "scroll-mt-24" },
      h(
        GlassCard, { className: "p-8 md:p-12" },
        h("h2", { className: "text-2xl md:text-3xl font-bold tracking-tight" }, ABOUT.title),
        h("div", { className: "mt-6 border border-dashed border-white/20 rounded-2xl p-8 text-center text-white/40 text-sm" }, "Content coming soon")
      )
    );

    return h(
      "div", { className: "min-h-screen text-white font-[Inter,Poppins,sans-serif] relative selection:bg-emerald-500/30" },
      h(
        "div", { className: "fixed inset-0 -z-10" },
        h("img", { src: CONTENT.backgroundImage, className: "w-full h-full object-cover" }),
        h("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[1px]" }),
        h("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" })
      ),
      header,
      h("main", { className: "max-w-[1280px] mx-auto px-4 md:px-6 pb-32 space-y-16 pt-6" }, home, destinations, experiences, booking, about),
      h("style", null, "\n        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700&display=swap');\n        *{font-family:Inter, Poppins, sans-serif}\n        ::-webkit-scrollbar{width:6px;height:6px}\n        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:99px}\n        .scroll-mt-24{scroll-margin-top:6rem}\n      ")
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(React.StrictMode, null, h(App)));
})();
