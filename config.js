/* ============================================================
   ✏️  KREM CHYMPE — EDIT-THIS-FILE
   ============================================================

   THIS IS THE ONLY FILE YOU NEED TO OPEN TO CHANGE:
     • Photos   (window.KC_IMAGES  below)
     • Text     (window.KC_CONTENT below)

   You do NOT need to open index.html or app.js for any of that.

   ------------------------------------------------------------
   HOW TO EDIT SAFELY — read this once before touching anything
   ------------------------------------------------------------
   1. Text (words/sentences) needs quote marks around it.
        Correct:  siteName: "KREM CHYMPE",
        Wrong:    siteName: KREM CHYMPE,

   2. Every line (except the very last one in a { } or [ ] group)
      must end with a comma  ,  — this is the single most common
      mistake. If the site breaks after an edit, check that you
      didn't delete a comma or leave a trailing comma after the
      LAST item in a group.

   3. Anything after // on a line is just a note for humans — the
      website ignores it completely.

   4. When you're done editing, save the file and push/upload it
      the same way as before.

   5. If something looks wrong after you publish, a red banner
      will appear at the top of the site telling you this file
      has a mistake in it, instead of the site just going blank.
      Undo your last change, save, and republish.

   ------------------------------------------------------------
   NOTE ON THIS VERSION
   ------------------------------------------------------------
   The site has been reset down to just the Home page, structured
   as:
     Home (introduction)
       ├─ Destinations
       │    ├─ Krem Chympe Waterfall & Cave
       │    └─ Wilderness Expedition
       ├─ Experiences
       ├─ Booking   (empty — add content below when ready)
       └─ About Us  (empty — add content below when ready)

   All old package/pricing/booking-flow/gallery pages were removed.
   The "Book Now" buttons on the destination cards currently just
   jump down to the empty Booking section.
   ============================================================ */

(function () {
  "use strict";

  // ============================================================
  // 🖼️  PHOTOS — file names must match a file sitting next to
  // index.html exactly (including capitalization and spaces).
  // ============================================================
  window.KC_IMAGES = {
    heroBg: "Blue watefall.jpg",
    logo: "logo.png",

    kremChympeCard: "Cave Entrance Falls.jpg",
    wildernessCard: "Trek Trail Mist.jpg",

    exp1: "Cave diving.jpg",
    exp2: "Camping Deck View.jpg",
    exp3: "Rafting.jpg",
    exp4: "Trekking.jpg",
    exp5: "Rock formations.jpg",
    exp6: "Happy waterfall.jpg"
  };

  // ============================================================
  // ✏️  TEXT CONTENT
  // ============================================================
  window.KC_CONTENT = {
    siteName: "KREM CHYMPE",
    siteSub: "ADVENTURE & CAMPING",
    whatsappNumber: "916001877518",
    logoImage: window.KC_IMAGES.logo,
    backgroundImage: window.KC_IMAGES.heroBg,

    // ---- Top navigation ----
    nav: {
      items: [
        { label: "Home", id: "home" },
        { label: "Destinations", id: "destinations" },
        { label: "Experiences", id: "experiences" },
        { label: "Booking", id: "booking" },
        { label: "About Us", id: "about" }
      ]
    },

    // ---- Home / introduction ----
    hero: {
      badge: "MEGHALAYA — CHYMPE FALL & CAVE ADVENTURE",
      title: "Discover Meghalaya's Hidden Paradise",
      sub: "From a hidden waterfall and cave system a short trek from Khaddum Village, to a 6-day wilderness expedition into untouched landscapes — we design guided trips into Meghalaya's least-visited corners."
    },

    // ---- Destinations ----
    destinations: {
      title: "Destinations",
      subtitle: "Two ways to explore Meghalaya with us",
      items: [
        {
          id: "krem-chympe",
          name: "Krem Chympe Waterfall & Cave",
          image: window.KC_IMAGES.kremChympeCard,
          description: "Book a guided package tour to Krem Chympe. A forest trek from Khaddum Village leads to the Chympe (Pieltleng) Waterfall and into the Krem Chympe cave system — one of Meghalaya's longest, with underground pools, golden mineral formations, and rare cave wildlife.",
          buttonLabel: "Book Now",
          link: "krem-chympe/index.html"
        },
        {
          id: "wilderness-expedition",
          name: "Wilderness Expedition",
          image: window.KC_IMAGES.wildernessCard,
          description: "Book the 6-day Wilderness Expedition — a multi-day journey deep into Meghalaya's backcountry, trekking to waterfalls and landscapes most visitors never reach, with camping along the way.",
          buttonLabel: "Book Now",
          link: "wilderness-expedition/index.html"
        }
      ]
    },

    // ---- Experiences — grouped by which destination they come from ----
    experiences: {
      title: "Experiences",
      subtitle: "What our team can offer",
      groups: [
        {
          name: "From the Krem Chympe Visit",
          items: [
            { title: "Cave Exploration", description: "Guided descents into Krem Chympe's chambers, pools, and formations.", image: window.KC_IMAGES.exp1 },
            { title: "Waterfall Visits", description: "Swimming and photo stops at the Chympe (Pieltleng) Waterfall.", image: window.KC_IMAGES.exp6 },
            { title: "Guided Trekking", description: "Forest trail from Khaddum Village to the waterfall and cave, at your pace.", image: window.KC_IMAGES.exp4 }
          ]
        },
        {
          name: "From the Wilderness Expedition",
          items: [
            { title: "Multi-Day Camping", description: "Overnight camps out in the wilderness across the 6-day route, guide included.", image: window.KC_IMAGES.exp2 },
            { title: "Bamboo River Rafting", description: "A calmer way to take in the valley, on the river.", image: window.KC_IMAGES.exp3 },
            { title: "Rock & Landscape Tours", description: "Limestone formations and viewpoints most tourists never see.", image: window.KC_IMAGES.exp5 }
          ]
        }
      ]
    },

    // ---- Booking — leave empty, fill in later ----
    booking: {
      title: "Booking"
    },

    // ---- About Us — leave empty, fill in later ----
    about: {
      title: "About Us"
    }
  };

  // ============================================================
  // Basic validation — shows a red banner instead of a blank page
  // if a required field above is missing or the wrong type.
  // ============================================================
  var problems = [];
  function need(obj, path, type) {
    var parts = path.split(".");
    var v = obj;
    for (var i = 0; i < parts.length; i++) {
      if (v == null) { problems.push(path + " is missing."); return; }
      v = v[parts[i]];
    }
    if (v == null) { problems.push(path + " is missing."); return; }
    if (type === "string" && typeof v !== "string") {
      problems.push(path + " should be text in quotes — got: " + JSON.stringify(v));
    }
  }

  need(window.KC_CONTENT, "siteName", "string");
  need(window.KC_CONTENT, "whatsappNumber", "string");
  if (window.KC_CONTENT && window.KC_CONTENT.whatsappNumber && !/^\d{10,15}$/.test(window.KC_CONTENT.whatsappNumber)) {
    problems.push("whatsappNumber should be digits only, with country code, no + or spaces (e.g. 916001877518) — got: " + JSON.stringify(window.KC_CONTENT.whatsappNumber));
  }

  if (problems.length && typeof window.showConfigError === "function") {
    window.showConfigError(
      "Found " + problems.length + " problem(s) in config.js: " + problems.join(" | ")
    );
  }
})();
