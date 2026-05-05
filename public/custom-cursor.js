/**
 * 极简自定义指针：实心点 + 空心环（Lerp 跟随）。
 * 悬停可点击元素时环放大 + mix-blend-mode: difference，圆点淡出。
 * 仅在 (pointer: fine) 且非 prefers-reduced-motion 时启用。
 */
(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var root = document.getElementById("custom-cursor-portal");
  if (!root) return;

  document.documentElement.classList.add("cc-enabled");

  var dot = document.createElement("div");
  dot.className = "cc-dot";
  var host = document.createElement("div");
  host.className = "cc-ring-host";
  host.setAttribute("data-hover", "0");
  var ring = document.createElement("div");
  ring.className = "cc-ring";
  host.appendChild(ring);
  root.appendChild(dot);
  root.appendChild(host);

  var mx = window.innerWidth * 0.5;
  var my = window.innerHeight * 0.5;
  var rx = mx;
  var ry = my;
  var raf = 0;
  var hover = false;

  /** 跟随松紧：越小越「重」越大越跟手 */
  var LERP = 0.16;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function isInteractive(x, y) {
    var list = document.elementsFromPoint(x, y);
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (!el || el === root || root.contains(el)) continue;
      if (el.closest && el.closest("[id^='dify-chatbot']")) {
        return true;
      }
      if (
        el.closest(
          "a[href], button, [role='button'], input, select, textarea, img, summary, label[for], [data-cursor-hover]",
        )
      ) {
        return true;
      }
    }
    return false;
  }

  function tick() {
    raf = 0;
    rx = lerp(rx, mx, LERP);
    ry = lerp(ry, my, LERP);

    dot.style.transform = "translate3d(" + mx + "px, " + my + "px, 0) translate(-50%, -50%)";
    host.style.transform = "translate3d(" + rx + "px, " + ry + "px, 0)";

    var h = isInteractive(mx, my);
    if (h !== hover) {
      hover = h;
      host.setAttribute("data-hover", hover ? "1" : "0");
      if (hover) dot.classList.add("cc-dot--hide");
      else dot.classList.remove("cc-dot--hide");
    }

    var drift = Math.abs(rx - mx) > 0.012 || Math.abs(ry - my) > 0.012;
    if (drift) {
      raf = window.requestAnimationFrame(tick);
    }
  }

  function schedule() {
    if (!raf) raf = window.requestAnimationFrame(tick);
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    schedule();
  }

  function onLeave() {
    mx = -100;
    my = -100;
    schedule();
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("blur", onLeave, { passive: true });
  window.addEventListener("scroll", schedule, { passive: true, capture: true });

  schedule();
})();
