# Mã nguồn phục hồi — 1 file JS (không JSX)

Toàn bộ giao diện + hiệu ứng trang reward nằm trong **một file** `app.js`, dùng `React.createElement`, không JSX.

## Cách dùng

1. Trong HTML có thẻ `<div id="root"></div>`.
2. Load React và ReactDOM (UMD) trước, rồi load `app.js`:

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="src-reconstructed/app.js"></script>
```

3. Script tự chèn CSS hiệu ứng và mount app vào `#root`.

- Nếu dùng React 18 với `react-dom/client` (createRoot): dùng bản có `createRoot`.
- Nếu chỉ có `ReactDOM.render` (React 17): app.js tự dùng `render`.

Gọi `window.mountRewardApp("root")` để mount lại (hoặc mount vào id khác).

## Nội dung app.js

- **CSS:** Chuỗi REWARDS_CSS (particles, confetti, mưa phong bì, scroll-vertical, fade/scale, bounce, sparkle, ripple, pulse-glow, shimmer, magnetic-hover) được inject vào `<style>`.
- **Component RewardPage:** Background particles, confetti, envelope rain (click được), header logo, grid 3 cột (banner + danh sách trúng | 6 phong bì + input mã | cột trống), input "NHẬP MÃ NHẬN QUÀ".
- **Không phụ thuộc:** moment; format ngày dùng `Date` thuần.

## Yêu cầu

- React (17 hoặc 18) trên `window`.
- Tailwind (hoặc class utility tương ứng) cho các class như `flex`, `grid`, `rounded-lg`… Nếu không có Tailwind, cần tự thêm CSS cho các class đó hoặc chỉnh lại class trong `app.js`.

## Assets

Đường dẫn trong script: `/assets/logo.png`, `/assets/envelope-CWeT4Zot.png`. CSS dùng `/assets/images/bg.png`, `/assets/images/bg_mobile.png` — chỉnh trong chuỗi `REWARDS_CSS` nếu cần.
