/**
 * Trang reward — 1 file JS (không JSX): giao diện + hiệu ứng.
 * Logo: logo-f1S8t501.png | Banner: logo-banner-ClVyaOeI.png | Phong bì: envelope-CWeT4Zot.png
 */
(function (global) {
  "use strict";

  var React = global.React;
  var ReactDOM = global.ReactDOM;
  if (!React || !ReactDOM) {
    console.warn("app.js: cần React và ReactDOM trên window");
    return;
  }

  var useState = React.useState;
  var useCallback = React.useCallback;
  var useMemo = React.useMemo;
  var useEffect = React.useEffect;
  var createElement = React.createElement;
  var createRoot = (ReactDOM.createRoot || (ReactDOM.default && ReactDOM.default.createRoot)) || null;

  function rewardsCssWithBase(base) {
    return (
      ".reward-bg-responsive{min-height:100vh;background:#0a0a0a}" +
      ".reward-bg-video{position:fixed;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none}" +
      ".reward-bg-video-mobile{display:none}" +
      ".reward-bg-video-desktop{display:block}" +
      "@media(max-width:534px){.reward-bg-video-mobile{display:block}.reward-bg-video-desktop{display:none}}"
    );
  }
  var REWARDS_CSS_REST =
    ".reward-header{display:flex}" +
    "@media (max-width:534px){.reward-header{display:none}.reward-main-content{margin-top:14rem}}" +
    ".reward-main-content{padding-top:0}" +
    "@media (min-width:535px){.reward-main-content{padding-top:1rem;margin-top:2rem}}" +
    "@media (min-width:640px){.reward-main-content{padding-top:1.5rem;margin-top:0}}" +
    "@media (min-width:768px){.reward-main-content{padding-top:2rem}}" +
    "@media (min-width:1024px){.reward-main-content{padding-top:3rem}}" +
    ".background-particles{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:1;overflow:hidden}" +
    ".background-particle{position:absolute;width:4px;height:4px;background:radial-gradient(circle,rgba(255,215,0,.6) 0%,transparent 100%);border-radius:50%;animation:particle-float 15s ease-in-out infinite}" +
    "@keyframes particle-float{0%,100%{transform:translateY(0) translate(0) rotate(0);opacity:.3}50%{transform:translateY(-100px) translate(50px) rotate(180deg);opacity:.8}}" +
    ".confetti{position:fixed;width:10px;height:10px;background:var(--confetti-color,#FFD700);animation:confetti-fall 3s linear forwards;pointer-events:none;z-index:9999}" +
    "@keyframes confetti-fall{0%{transform:translateY(-100vh) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}" +
    ".envelope-rain-wrapper{position:absolute;top:-200px;animation:rain-fall cubic-bezier(.4,0,.2,1) infinite;animation-duration:var(--rain-duration,8s);will-change:transform,opacity;z-index:50;--swing-x:calc((var(--random-swing,0) - .5) * 30px)}" +
    ".envelope-rain{animation:rain-rotate ease-in-out infinite;animation-duration:var(--rain-duration,8s);will-change:transform;position:relative}" +
    ".envelope-rain::before{content:'';position:absolute;top:50%;left:50%;width:100%;height:100%;background:radial-gradient(circle,rgba(255,215,0,.15) 0%,transparent 70%);transform:translate(-50%,-50%);animation:trail-fade .6s ease-out infinite;pointer-events:none;z-index:-1}" +
    ".envelope-rain-img{width:4rem;height:auto;opacity:1;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}" +
    ".envelope-rain-wrapper:hover .envelope-rain-img{transform:scale(1.2)!important}" +
    ".envelope-rain-wrapper:active .envelope-rain-img{transform:scale(.9)!important}" +
    "@keyframes rain-fall{0%{transform:translateY(-200px);opacity:1}100%{transform:translateY(calc(100vh + 200px)) translate(var(--swing-x,0));opacity:1}}" +
    "@keyframes rain-rotate{0%{transform:rotate(var(--initial-rotation,0deg)) scale(1)}100%{transform:rotate(calc(var(--initial-rotation,0deg) + 360deg)) scale(1)}}" +
    "@keyframes trail-fade{0%{opacity:.4;transform:scale(1.1)}100%{opacity:0;transform:scale(.8) translateY(20px)}}" +
    ".envelope-particles{position:absolute;top:50%;left:50%;width:100%;height:100%;pointer-events:none;z-index:-1}" +
    ".envelope-particle{position:absolute;width:4px;height:4px;background:radial-gradient(circle,gold,orange);border-radius:50%;box-shadow:0 0 6px rgba(255,215,0,.8);animation:particle-fall 1.5s ease-out infinite}" +
    ".envelope-particle:nth-child(1){top:20%;left:30%}.envelope-particle:nth-child(2){top:40%;left:60%;animation-delay:.2s}" +
    ".envelope-particle:nth-child(3){top:60%;left:20%;animation-delay:.4s}.envelope-particle:nth-child(4){top:80%;left:70%;animation-delay:.6s}" +
    "@keyframes particle-fall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100px) rotate(360deg);opacity:0}}" +
    "@media (max-width:640px){.envelope-rain-wrapper:nth-child(n+10){display:none}}" +
    "@keyframes scroll-vertical{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}" +
    ".animate-scroll-vertical{animation:scroll-vertical 38s linear infinite;will-change:transform}.animate-scroll-vertical:hover{animation-play-state:paused}" +
    "@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}100%{opacity:1;transform:translateY(0)}}" +
    "@keyframes scaleIn{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}" +
    ".animate-fade-in-up{animation:fadeInUp .6s ease-out forwards}.animate-scale-in{animation:scaleIn .5s ease-out forwards}" +
    "@keyframes bounce-in{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1);opacity:1}}.bounce-in{animation:bounce-in .6s ease-out}" +
    ".sparkle-effect{position:relative;overflow:hidden}.sparkle-effect::before,.sparkle-effect::after{content:'';position:absolute;width:20px;height:20px;background:radial-gradient(circle,rgba(255,255,255,.8) 0%,transparent 70%);border-radius:50%;animation:sparkle 2s ease-in-out infinite}" +
    "@keyframes sparkle{0%,100%{opacity:0;transform:scale(0) rotate(0)}50%{opacity:1;transform:scale(1) rotate(180deg)}}" +
    ".ripple-effect{position:relative;overflow:hidden}.ripple-effect:active::after{width:300px;height:300px;animation:ripple .6s ease-out}" +
    ".ripple-effect::after{content:'';position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(255,255,255,.5);transform:translate(-50%,-50%)}" +
    "@keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(4);opacity:0}}" +
    ".zoom-on-hover{transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.zoom-on-hover:hover{transform:scale(1.01)}" +
    "@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(255,215,0,.4)}50%{box-shadow:0 0 30px rgba(255,215,0,.8)}}.pulse-glow{animation:pulse-glow 2s ease-in-out infinite}" +
    "@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}.shimmer-effect{background:linear-gradient(90deg,transparent,rgba(255,255,255,.3) 50%,transparent);background-size:200% 100%;animation:shimmer 3s ease-in-out infinite}" +
    ".magnetic-hover{transition:transform .3s cubic-bezier(.23,1,.32,1)}.magnetic-hover:hover{transform:translateY(-5px) scale(1.05)}" +
    ".envelope-btn-size{width:240px;height:240px;min-width:240px;min-height:240px;box-sizing:border-box}" +
    "@media(min-width:640px){.envelope-btn-size{width:320px;height:320px;min-width:320px;min-height:320px}}" +
    "@media(min-width:768px){.envelope-btn-size{width:360px;height:360px;min-width:360px;min-height:360px}}" +
    "@media(min-width:1024px){.envelope-btn-size{width:340px;height:340px;min-width:340px;min-height:340px}}" +
    "@keyframes envelope-shake{0%,100%{transform:rotate(0deg)}15%{transform:rotate(-4deg)}30%{transform:rotate(4deg)}45%{transform:rotate(-3deg)}60%{transform:rotate(3deg)}75%{transform:rotate(-2deg)}90%{transform:rotate(2deg)}}" +
    ".envelope-shake{animation:envelope-shake 2s ease-in-out infinite}" +
    ".lixi-popup-box{background:linear-gradient(180deg,#fff 0%,#fffaf5 100%);border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,.2),0 0 0 1px rgba(249,115,22,.15);border:1px solid rgba(249,115,22,.25);overflow:hidden}" +
    ".lixi-popup-title{background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);color:#fff;font-size:1.25rem;font-weight:700;text-align:center;padding:1rem 1.5rem;margin:0;letter-spacing:.02em;text-shadow:0 1px 2px rgba(0,0,0,.15)}" +
    ".lixi-popup-body{padding:1.5rem 1.5rem 1.75rem}" +
    ".lixi-popup-label{display:block;font-size:.8125rem;font-weight:600;color:#9a3412;margin-bottom:.35rem}" +
    ".lixi-popup-input{width:100%;border:1px solid #fed7aa;border-radius:12px;padding:.65rem 1rem;font-size:1rem;color:#1f2937;background:#fffbeb;transition:border-color .2s,box-shadow .2s;box-sizing:border-box}" +
    ".lixi-popup-input::placeholder{color:#c2410c;opacity:.7}" +
    ".lixi-popup-input:focus{outline:none;border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,.2)}" +
    ".lixi-popup-field{margin-bottom:1.15rem}" +
    ".lixi-popup-actions{display:flex;gap:.75rem;margin-top:1.25rem}" +
    ".lixi-popup-btn{flex:1;padding:.7rem 1rem;border-radius:12px;font-weight:600;font-size:.9375rem;cursor:pointer;transition:transform .15s,opacity .2s;border:none}" +
    ".lixi-popup-btn:disabled{opacity:.6;cursor:not-allowed}" +
    ".lixi-popup-btn:not(:disabled):active{transform:scale(.98)}" +
    ".lixi-popup-btn-secondary{background:#fff;color:#ea580c;border:2px solid #fdba74}" +
    ".lixi-popup-btn-secondary:hover:not(:disabled){background:#fff7ed}" +
    ".lixi-popup-btn-primary{background:linear-gradient(180deg,#f97316 0%,#ea580c 100%);color:#fff;box-shadow:0 4px 14px rgba(249,115,22,.4)}" +
    ".lixi-popup-btn-primary:hover:not(:disabled){background:linear-gradient(180deg,#fb923c 0%,#f97316 100%);box-shadow:0 6px 20px rgba(249,115,22,.45)}" +
    ".lixi-popup-msg{font-size:.875rem;margin-bottom:1rem;padding:.5rem 0}" +
    ".lixi-popup-msg.success{color:#15803d}" +
    ".lixi-popup-msg.error{color:#b91c1c}" +
    ".success-popup-overlay{position:fixed;inset:0;z-index:105;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,.5);pointer-events:auto}" +
    ".success-popup-box{position:relative;z-index:112;background:linear-gradient(180deg,#fff 0%,#fffaf5 100%);border-radius:24px;box-shadow:0 25px 50px -12px rgba(0,0,0,.35),0 0 0 1px rgba(249,115,22,.2);border:2px solid rgba(249,115,22,.35);max-width:min(92vw, 420px);width:100%;overflow:hidden;animation:success-popup-in .5s cubic-bezier(.34,1.56,.64,1)}" +
    "@keyframes success-popup-in{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:scale(1)}}" +
    ".success-popup-title{background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);color:#fff;font-size:1.35rem;font-weight:700;text-align:center;padding:1.25rem 1.5rem;margin:0}" +
    ".success-popup-body{padding:2rem 1.75rem;text-align:center}" +
    ".success-popup-text{font-size:1.05rem;line-height:1.6;color:#1f2937;margin:0 0 1.5rem}" +
    ".success-popup-btn{padding:.85rem 2rem;border-radius:14px;font-weight:600;font-size:1rem;cursor:pointer;border:none;background:linear-gradient(180deg,#f97316 0%,#ea580c 100%);color:#fff;box-shadow:0 4px 14px rgba(249,115,22,.4);transition:transform .15s,box-shadow .2s}" +
    ".success-popup-btn:hover{transform:scale(1.02);box-shadow:0 6px 20px rgba(249,115,22,.5)}" +
    ".success-confetti-layer{position:fixed;inset:0;z-index:106;pointer-events:none;overflow:hidden}" +
    ".success-envelope-layer{position:fixed;inset:0;z-index:107;pointer-events:none;overflow:hidden}" +
    ".success-confetti-item{position:absolute;width:10px;height:10px;animation:success-confetti-fall 6s linear forwards;pointer-events:none}" +
    "@keyframes success-confetti-fall{0%{transform:translateY(-100px) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}" +
    ".success-envelope-item{position:absolute;top:-150px;animation:success-envelope-fall 10s linear forwards;pointer-events:none;--swing-x:calc((var(--swing,0) - .5) * 40px)}" +
    "@keyframes success-envelope-fall{0%{transform:translateY(0) translateX(0) rotate(var(--rot,0deg));opacity:1}100%{transform:translateY(calc(100vh + 150px)) translateX(var(--swing-x)) rotate(calc(var(--rot,0deg) + 360deg));opacity:.9}}" +
    ".success-firework{position:fixed;inset:0;z-index:104;pointer-events:none}" +
    ".success-firework-burst{position:absolute;width:20px;height:20px;border-radius:50%;animation:firework-burst 1.2s ease-out forwards;opacity:0}" +
    "@keyframes firework-burst{0%{transform:scale(0);opacity:.9}100%{transform:scale(80);opacity:0}}" +
    ".success-firework-burst.gold{background:radial-gradient(circle,rgba(255,215,0,.8) 0%,transparent 70%)}" +
    ".success-firework-burst.orange{background:radial-gradient(circle,rgba(249,115,22,.7) 0%,transparent 70%)}" +
    ".success-firework-burst.red{background:radial-gradient(circle,rgba(220,38,38,.7) 0%,transparent 70%)}" +
    ".error-popup-overlay{position:fixed;inset:0;z-index:105;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,.5);pointer-events:auto}" +
    ".error-popup-box{position:relative;z-index:112;background:linear-gradient(180deg,#fff 0%,#fef2f2 100%);border-radius:24px;box-shadow:0 25px 50px -12px rgba(0,0,0,.35),0 0 0 1px rgba(185,28,28,.2);border:2px solid rgba(185,28,28,.3);max-width:min(92vw, 420px);width:100%;overflow:hidden;animation:success-popup-in .5s cubic-bezier(.34,1.56,.64,1)}" +
    ".error-popup-title{background:linear-gradient(135deg,#b91c1c 0%,#991b1b 100%);color:#fff;font-size:1.35rem;font-weight:700;text-align:center;padding:1.25rem 1.5rem;margin:0}" +
    ".error-popup-body{padding:2rem 1.75rem;text-align:center}" +
    ".error-popup-text{font-size:1rem;line-height:1.6;color:#1f2937;margin:0 0 1.5rem;color:#b91c1c}" +
    ".error-popup-btn{padding:.85rem 2rem;border-radius:14px;font-weight:600;font-size:1rem;cursor:pointer;border:none;background:linear-gradient(180deg,#b91c1c 0%,#991b1b 100%);color:#fff;box-shadow:0 4px 14px rgba(185,28,28,.35);transition:transform .15s,box-shadow .2s}" +
    ".error-popup-btn:hover{transform:scale(1.02);box-shadow:0 6px 20px rgba(185,28,28,.45)}";

  function injectStyle(css) {
    var el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

  function assetPath(path) {
    var p = (typeof location !== "undefined" && location.pathname) || "";
    var i = p.lastIndexOf("/");
    var base = i >= 0 ? p.substring(0, i + 1) : "";
    if (!base) base = "/";
    return base + (path.charAt(0) === "/" ? path.slice(1) : path);
  }

  var LOGO_URL = assetPath("assets/logo-f1S8t501.png");
  var LOGO_NHAN_THUONG_URL = assetPath("assets/nhanthuong-D2IU98cu.png");
  var LOGO_BANNER_URL = assetPath("assets/logo-banner-ClVyaOeI.png");
  var ENVELOPE_URL = assetPath("assets/envelope-CWeT4Zot.png");
  var CONFETTI_COLORS = ["#FFD700", "#FFA500", "#FF6B35", "#FF4500", "#DC143C", "#FF8C42"];

  function formatTime(t) {
    var d = new Date(t);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    var h = String(d.getHours()).padStart(2, "0");
    var min = String(d.getMinutes()).padStart(2, "0");
    var s = String(d.getSeconds()).padStart(2, "0");
    return y + "/" + m + "/" + day + " " + h + ":" + min + ":" + s;
  }

  var FAKE_PREFIXES = ["dnf", "abc", "user", "win", "vip", "pro", "top", "hot", "lucky", "star", "gold", "red", "blue", "sky", "sun", "moon", "fire", "king", "qt", "tm", "pk", "lv", "xd", "zz", "kk"];

  var API_LIXI = "https://apigz01.newpei.ink/api/li-xi";

  function RewardPage() {
    var _useState = useState(""),
      code = _useState[0],
      setCode = _useState[1];
    var _useState2 = useState([]),
      winners = _useState2[0],
      setWinners = _useState2[1];
    var _useState3 = useState(false),
      popupOpen = _useState3[0],
      setPopupOpen = _useState3[1];
    var _useState4 = useState(""),
      account = _useState4[0],
      setAccount = _useState4[1];
    var _useState5 = useState(""),
      bankLast4 = _useState5[0],
      setBankLast4 = _useState5[1];
    var _useState6 = useState(false),
      submitting = _useState6[0],
      setSubmitting = _useState6[1];
    var _useState7 = useState(""),
      submitMessage = _useState7[0],
      setSubmitMessage = _useState7[1];
    var _useState8 = useState(false),
      showSuccessPopup = _useState8[0],
      setShowSuccessPopup = _useState8[1];
    var _useState9 = useState([]),
      successConfetti = _useState9[0],
      setSuccessConfetti = _useState9[1];
    var _useState10 = useState([]),
      successEnvelopeRain = _useState10[0],
      setSuccessEnvelopeRain = _useState10[1];
    var _useState11 = useState(""),
      errorPopupMessage = _useState11[0],
      setErrorPopupMessage = _useState11[1];

    var fakeWinners = useMemo(function () {
      var list = [];
      var now = Date.now();
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      var startOfToday = d.getTime();
      var range = Math.max(1, now - startOfToday);
      for (var i = 0; i < 200; i++) {
        var prefix = FAKE_PREFIXES[Math.floor(Math.random() * FAKE_PREFIXES.length)];
        var suffix = Math.random() > 0.5 ? "***" : "**" + (Math.floor(Math.random() * 10));
        var time = startOfToday + Math.random() * range;
        list.push({
          time: time,
          username: prefix + suffix,
          point: 50 + Math.floor(Math.random() * 150),
        });
      }
      list.sort(function (a, b) {
        return b.time - a.time;
      });
      return list;
    }, []);

    var displayWinners = winners.length > 0 ? winners : fakeWinners;
    var listForScroll = displayWinners.length > 0 ? [].concat(displayWinners, displayWinners) : [];

    var backgroundParticles = useMemo(function () {
      return Array.from({ length: 20 }).map(function (_, i) {
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 15,
          size: 2 + Math.random() * 3,
        };
      });
    }, []);

    var confettiList = useMemo(function () {
      var w = typeof window !== "undefined" ? window.innerWidth : 400;
      return Array.from({ length: 25 }).map(function (_, i) {
        return {
          id: i,
          x: Math.random() * w,
          y: -20 - Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 2,
          duration: 4 + Math.random() * 4,
        };
      });
    }, []);

    var envelopeRainList = useMemo(function () {
      return Array.from({ length: 10 }).map(function (_, i) {
        return {
          id: i,
          left: Math.random() * 100,
          delay: i * 0.5 + Math.random() * 3,
          duration: 24 + Math.random() * 14,
          rotation: Math.random() * 360,
          size: 1.1 + Math.random() * 0.5,
          swing: Math.random(),
        };
      });
    }, []);

    var handleOpenEnvelope = useCallback(function () {
      setSubmitMessage("");
      setPopupOpen(true);
    }, []);

    var handleClosePopup = useCallback(function () {
      if (!submitting) {
        setPopupOpen(false);
        setAccount("");
        setBankLast4("");
        setSubmitMessage("");
      }
    }, [submitting]);

    var handleSubmitLixi = useCallback(function () {
      var acc = (account || "").trim();
      var last4 = (bankLast4 || "").trim().replace(/\D/g, "").slice(0, 4);
      if (!acc) {
        setSubmitMessage("Vui lòng nhập tên tài khoản.");
        return;
      }
      if (last4.length !== 4) {
        setSubmitMessage("Vui lòng nhập đúng 4 số cuối tài khoản ngân hàng.");
        return;
      }
      setSubmitting(true);
      setSubmitMessage("");
      fetch(API_LIXI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: acc, bankLast4: last4 }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (_ref) {
          var ok = _ref.ok,
            data = _ref.data;
          setSubmitting(false);
          if (ok && data.success) {
            setPopupOpen(false);
            setAccount("");
            setBankLast4("");
            setSubmitMessage("");
            setShowSuccessPopup(true);
          } else if (ok) {
            setPopupOpen(false);
            setAccount("");
            setBankLast4("");
            setSubmitMessage("");
            setErrorPopupMessage(
              data.message || "IP hoặc tài khoản này đã nhận lì xì trong ngày hôm nay."
            );
          } else {
            setPopupOpen(false);
            setAccount("");
            setBankLast4("");
            setSubmitMessage("");
            setErrorPopupMessage(data.message || data.msg || "Có lỗi xảy ra. Vui lòng thử lại.");
          }
        })
        .catch(function (err) {
          setSubmitting(false);
          setSubmitMessage("");
          setErrorPopupMessage("Lỗi kết nối. Vui lòng thử lại.");
        });
    }, [account, bankLast4]);

    useEffect(function () {
      function fetchWinners() {
        try {
          setWinners([]);
        } catch (_) {
          setWinners([]);
        }
      }
      fetchWinners();
      var id = setInterval(fetchWinners, 10000);
      return function () {
        clearInterval(id);
      };
    }, []);

    useEffect(function () {
      if (!showSuccessPopup) return;
      var w = typeof window !== "undefined" ? window.innerWidth : 400;
      var confettiCount = 120;
      var envelopeCount = 45;
      setSuccessConfetti(
        Array.from({ length: confettiCount }).map(function (_, i) {
          return {
            id: "sc-" + i,
            x: Math.random() * w,
            y: -20 - Math.random() * 200,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            delay: Math.random() * 3,
            duration: 5 + Math.random() * 5,
          };
        })
      );
      setSuccessEnvelopeRain(
        Array.from({ length: envelopeCount }).map(function (_, i) {
          return {
            id: "se-" + i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 12 + Math.random() * 10,
            rotation: Math.random() * 360,
            size: 0.9 + Math.random() * 0.6,
            swing: Math.random(),
          };
        })
      );
      return function () {
        setSuccessConfetti([]);
        setSuccessEnvelopeRain([]);
      };
    }, [showSuccessPopup]);

    var handleCloseSuccessPopup = useCallback(function () {
      setShowSuccessPopup(false);
      setSuccessConfetti([]);
      setSuccessEnvelopeRain([]);
    }, []);

    var handleCloseErrorPopup = useCallback(function () {
      setErrorPopupMessage("");
    }, []);

    var videoMobile = assetPath("assets/images/BGMB.mov");
    var videoDesktop = assetPath("assets/images/BGVD.mov");
    return createElement(
      "div",
      {
        className:
          "min-h-screen relative overflow-y-auto flex flex-col items-center font-sans reward-bg-responsive",
      },
      createElement("video", {
        className: "reward-bg-video reward-bg-video-mobile",
        src: videoMobile,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        "aria-hidden": true,
      }),
      createElement("video", {
        className: "reward-bg-video reward-bg-video-desktop",
        src: videoDesktop,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        "aria-hidden": true,
      }),
      createElement(
        "div",
        { className: "background-particles" },
        backgroundParticles.map(function (p) {
          return createElement("div", {
            key: p.id,
            className: "background-particle",
            style: {
              left: p.left + "%",
              top: p.top + "%",
              width: p.size + "px",
              height: p.size + "px",
              animationDelay: p.delay + "s",
            },
          });
        })
      ),
      confettiList.map(function (c) {
        return createElement("div", {
          key: c.id,
          className: "confetti",
          style: {
            left: c.x,
            top: c.y,
            backgroundColor: c.color,
            animationDelay: c.delay + "s",
            animationDuration: c.duration + "s",
          },
        });
      }),
      createElement(
        "div",
        { className: "fixed inset-0 z-[50] overflow-hidden pointer-events-none" },
        envelopeRainList.map(function (e) {
          return createElement(
            "div",
            {
              key: e.id,
              className: "envelope-rain-wrapper cursor-pointer pointer-events-auto",
              style: {
                left: e.left + "%",
                animationDelay: e.delay + "s",
                "--rain-duration": e.duration + "s",
                "--initial-rotation": e.rotation + "deg",
                "--random-swing": e.swing,
              },
              onClick: handleOpenEnvelope,
              role: "button",
              tabIndex: 0,
              onKeyDown: function (ev) {
                if (ev.key === "Enter") handleOpenEnvelope();
              },
              "aria-label": "Mở phong bì",
            },
            createElement(
              "div",
              {
                className: "envelope-rain",
                style: { transform: "rotate(var(--initial-rotation, 0deg))" },
              },
              createElement("img", {
                src: ENVELOPE_URL,
                alt: "Lì xì",
                className: "envelope-rain-img",
                style: { transform: "scale(" + e.size + ")" },
              }),
              createElement(
                "div",
                { className: "envelope-particles" },
                [1, 2, 3, 4].map(function (i) {
                  return createElement("div", { key: i, className: "envelope-particle" });
                })
              )
            )
          );
        })
      ),
      createElement(
        "header",
        {
          className:
            "reward-header w-full flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 md:pt-8 px-4 z-20",
        },
        createElement("img", {
          src: LOGO_URL,
          alt: "Logo",
          className:
            "w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto drop-shadow-2xl transition-all duration-300 object-contain",
        }),
        createElement("img", {
          src: LOGO_NHAN_THUONG_URL,
          alt: "",
          className: "h-auto max-w-full object-contain",
          style: { maxHeight: "80px" },
        })
      ),
      createElement(
        "div",
        {
          className:
            "grid grid-cols-1 lg:grid-cols-12 w-full max-w-full mx-auto items-start relative z-10 reward-main-content px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-6 lg:gap-8",
        },
        createElement(
          "div",
          {
            className:
              "order-2 lg:order-1 col-span-1 lg:col-span-3 flex justify-center lg:justify-start xl:justify-center",
          },
          createElement(
            "div",
            {
              className:
                "relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[300px] xl:max-w-[460px] xl:-mt-10",
            },
            createElement("img", {
              src: LOGO_BANNER_URL,
              alt: "Logo Banner",
              className: "w-full h-auto drop-shadow-2xl object-contain",
            }),
            createElement(
              "div",
              {
                className:
                  "absolute top-[15%] sm:top-[13%] bottom-[5%] left-[3%] sm:left-[4%] right-[3%] sm:right-[4%] overflow-hidden pr-1",
              },
              createElement(
                "div",
                { className: "animate-scroll-vertical mt-6 sm:mt-0" },
                listForScroll.map(function (w, idx) {
                  return createElement(
                    "div",
                    {
                      key: idx + "-" + (w.time || 0) + "-" + w.username,
                      className:
                        "py-1.5 sm:py-2 border-b border-orange-100/50 flex flex-col text-xs sm:text-sm mb-1",
                    },
                    createElement(
                      "div",
                      {
                        className:
                          "flex justify-between text-gray-800 font-medium text-[10px] sm:text-xs mb-0.5 sm:mb-1 px-2 sm:px-3",
                      },
                      createElement("span", { className: "truncate pr-2" }, formatTime(w.time)),
                      createElement("span", { className: "font-bold truncate" }, w.username)
                    ),
                    createElement(
                      "div",
                      { className: "font-bold text-gray-800 text-[10px] sm:text-xs px-2 sm:px-3" },
                      "+",
                      w.point,
                      " điểm thưởng"
                    )
                  );
                })
              )
            )
          )
        ),
        createElement(
          "div",
          {
            className:
              "order-1 lg:order-2 col-span-1 lg:col-span-6 flex flex-col items-center w-full animate-fade-in-up",
          },
          createElement(
            "div",
            {
              className:
                "mb-4 sm:mb-6 md:mb-6 flex justify-center w-full overflow-hidden",
            },
            createElement(
              "button",
              {
                type: "button",
                onClick: handleOpenEnvelope,
                className:
                  "envelope-btn-size envelope-shake group relative z-20 inline-flex items-center justify-center p-0 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 rounded-lg ripple-effect zoom-on-hover sparkle-effect bounce-in",
                "aria-label": "Mở phong bì",
              },
              createElement("img", {
                src: ENVELOPE_URL,
                alt: "Lì xì",
                className:
                  "w-full h-full object-contain drop-shadow-lg transition-all duration-300",
              }),
              createElement("div", {
                className:
                  "absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300",
              })
            )
          )
        ),
        createElement(
          "div",
          {
            className:
              "order-3 lg:order-3 col-span-1 lg:col-span-3 hidden lg:flex justify-center xl:justify-end items-start pt-8",
          },
          createElement("div", {
            className:
              "w-full max-w-[200px] xl:max-w-[250px] opacity-0 lg:opacity-100 transition-opacity duration-300",
          })
        )
      ),
      createElement("div", { className: "h-8 sm:h-12 md:h-16 lg:h-20" }),
      popupOpen &&
        createElement(
          "div",
          {
            className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
            onClick: function (e) {
              if (e.target === e.currentTarget) handleClosePopup();
            },
          },
          createElement("div", {
            className: "bg-black/60 absolute inset-0",
            "aria-hidden": true,
            onClick: handleClosePopup,
          }),
          createElement(
            "div",
            {
              className: "relative lixi-popup-box max-w-md w-full",
              style: { maxWidth: "min(90vw, 400px)" },
              onClick: function (e) {
                e.stopPropagation();
              },
            },
            createElement("h3", { className: "lixi-popup-title", children: "Nhận lì xì" }),
            createElement(
              "div",
              { className: "lixi-popup-body" },
              createElement(
                "div",
                { className: "lixi-popup-field" },
                createElement("label", { className: "lixi-popup-label", htmlFor: "popup-account", children: "Tên tài khoản" }),
                createElement("input", {
                  id: "popup-account",
                  type: "text",
                  value: account,
                  onChange: function (e) {
                    setAccount(e.target.value);
                  },
                  placeholder: "Nhập tên tài khoản",
                  className: "lixi-popup-input",
                })
              ),
              createElement(
                "div",
                { className: "lixi-popup-field" },
                createElement("label", { className: "lixi-popup-label", htmlFor: "popup-bank4", children: "4 số cuối tài khoản ngân hàng" }),
                createElement("input", {
                  id: "popup-bank4",
                  type: "text",
                  inputMode: "numeric",
                  maxLength: 4,
                  value: bankLast4,
                  onChange: function (e) {
                    setBankLast4(e.target.value.replace(/\D/g, "").slice(0, 4));
                  },
                  placeholder: "Ví dụ: 6416",
                  className: "lixi-popup-input",
                })
              ),
              submitMessage &&
                createElement("p", {
                  className: "lixi-popup-msg " + (submitMessage.indexOf("thành công") >= 0 ? "success" : "error"),
                  children: submitMessage,
                }),
              createElement(
                "div",
                { className: "lixi-popup-actions" },
                createElement("button", {
                  type: "button",
                  onClick: handleSubmitLixi,
                  disabled: submitting,
                  className: "lixi-popup-btn lixi-popup-btn-primary",
                  style: { width: "100%" },
                  children: submitting ? "Đang gửi..." : "Nhận lì xì",
                })
              )
            )
          )
        ),
      showSuccessPopup &&
        createElement(
          React.Fragment,
          null,
          createElement("div", {
            className: "success-popup-overlay",
            onClick: handleCloseSuccessPopup,
            "aria-label": "Đóng",
          }, createElement(
            "div",
            {
              className: "success-popup-box",
              onClick: function (e) {
                e.stopPropagation();
              },
              role: "dialog",
              "aria-modal": true,
              "aria-labelledby": "success-popup-title",
            },
            createElement("h2", { id: "success-popup-title", className: "success-popup-title" }, "Chúc mừng!"),
            createElement(
              "div",
              { className: "success-popup-body" },
              createElement(
                "p",
                { className: "success-popup-text" },
                "Chúc mừng bạn đã nhận được lì xì! Hãy quay lại tài khoản trải nghiệm ngay."
              ),
              createElement("button", {
                type: "button",
                className: "success-popup-btn",
                onClick: handleCloseSuccessPopup,
                children: "Đóng",
              })
            )
          )),
          createElement(
            "div",
            { className: "success-firework" },
            [
              { id: "fw1", left: "20%", top: "30%", delay: 0, c: "gold" },
              { id: "fw2", left: "80%", top: "25%", delay: 0.15, c: "orange" },
              { id: "fw3", left: "50%", top: "40%", delay: 0.3, c: "red" },
              { id: "fw4", left: "35%", top: "55%", delay: 0.45, c: "gold" },
              { id: "fw5", left: "70%", top: "60%", delay: 0.6, c: "orange" },
              { id: "fw6", left: "15%", top: "70%", delay: 0.2, c: "red" },
              { id: "fw7", left: "90%", top: "75%", delay: 0.35, c: "gold" },
            ].map(function (b) {
              return createElement("div", {
                key: b.id,
                className: "success-firework-burst " + b.c,
                style: {
                  left: b.left,
                  top: b.top,
                  animationDelay: b.delay + "s",
                },
              });
            })
          ),
          createElement(
            "div",
            { className: "success-confetti-layer" },
            successConfetti.map(function (c) {
              return createElement("div", {
                key: c.id,
                className: "success-confetti-item",
                style: {
                  left: c.x + "px",
                  top: c.y + "px",
                  backgroundColor: c.color,
                  animationDelay: c.delay + "s",
                  animationDuration: c.duration + "s",
                },
              });
            })
          ),
          createElement(
            "div",
            { className: "success-envelope-layer" },
            successEnvelopeRain.map(function (e) {
              return createElement(
                "div",
                {
                  key: e.id,
                  className: "success-envelope-item",
                  style: {
                    left: e.left + "%",
                    animationDelay: e.delay + "s",
                    animationDuration: e.duration + "s",
                    "--swing": e.swing,
                    "--rot": e.rotation + "deg",
                  },
                },
                createElement("img", {
                  src: ENVELOPE_URL,
                  alt: "",
                  className: "envelope-rain-img",
                  style: { width: "3.5rem", height: "auto", transform: "scale(" + e.size + ")" },
                })
              );
            })
          )
        ),
      errorPopupMessage &&
        createElement(
          "div",
          {
            className: "error-popup-overlay",
            onClick: handleCloseErrorPopup,
            "aria-label": "Đóng",
          },
          createElement(
            "div",
            {
              className: "error-popup-box",
              onClick: function (e) {
                e.stopPropagation();
              },
              role: "dialog",
              "aria-modal": true,
              "aria-labelledby": "error-popup-title",
            },
            createElement("h2", { id: "error-popup-title", className: "error-popup-title" }, "Thất bại"),
            createElement(
              "div",
              { className: "error-popup-body" },
              createElement("p", { className: "error-popup-text" }, errorPopupMessage),
              createElement("button", {
                type: "button",
                className: "error-popup-btn",
                onClick: handleCloseErrorPopup,
                children: "Đóng",
              })
            )
          )
        )
    );
  }

  function mountRewardApp(containerId) {
    var id = containerId == null ? "root" : containerId;
    var el = document.getElementById(id);
    if (!el) {
      console.warn("app.js: không tìm thấy #" + id);
      return;
    }
    var base = (function () {
      var p = (typeof location !== "undefined" && location.pathname) || "";
      var i = p.lastIndexOf("/");
      return i >= 0 ? p.substring(0, i + 1) : "";
    })();
    injectStyle(rewardsCssWithBase(base) + REWARDS_CSS_REST);
    var tree = createElement(React.StrictMode, null, createElement(RewardPage));
    if (typeof createRoot === "function") {
      var root = createRoot(el);
      root.render(tree);
      return root;
    }
    ReactDOM.render(tree, el);
    return null;
  }

  if (typeof document !== "undefined" && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mountRewardApp("root");
    });
  } else if (typeof document !== "undefined") {
    mountRewardApp("root");
  }

  global.mountRewardApp = mountRewardApp;
})(typeof window !== "undefined" ? window : globalThis);
