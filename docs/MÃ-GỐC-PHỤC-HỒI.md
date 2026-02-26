# Giải mã cấu trúc từ bundle `index-_HslN23R.js`

**Lưu ý:** Không có file source map (`.map`) trong project, nên **không thể khôi phục 100% mã gốc**. Tài liệu này mô tả cấu trúc ứng dụng được suy ra từ bundle (minified + bundled).

---

## 1. Công nghệ

- **React** (production build), **React DOM** – `createRoot`, `StrictMode`, `jsx`/`jsxs`
- **Moment.js** 2.30.1 + **moment-timezone** 0.6.0 – format ngày giờ, timezone `Asia/Ho_Chi_Minh`
- **Vite** – bundle dạng ES module, preload

---

## 2. Cây component (suy ra từ cuối file)

```
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <hy>                    {/* Provider / Layout */}
      <fy>                  {/* Có thể là Theme hoặc Router context */}
        <CS>                {/* Trang chính (memo cache) */}
          <ES>              {/* Trang reward / nhập mã */}
          </ES>
        </CS>
      </fy>
    </hy>
  </StrictMode>
)
```

- **ES**: Trang chính – form nhập mã, phong bì lì xì, danh sách người trúng, popup.
- **CS**: Wrapper dùng `Symbol.for("react.memo_cache_sentinel")` (React 19 cache).

---

## 3. Trang chính (ES) – Chức năng

### 3.1 Giao diện

- **Logo:** `bR` (logo C168/GK88), `zR` (banner phụ).
- **Ảnh:** `gA` = phong bì lì xì, `MR` = banner bên trái, `pR` = popup cảnh báo, `eR` = nút OK.
- **Background:** particles + confetti + “envelope rain” (phong bì rơi), animation CSS.

### 3.2 Form nhập mã

- **Input:** placeholder `"NHẬP MÃ NHẬN QUÀ"` (và trong popup: `"Vui Lòng Nhập Mã Nhận Quà"`).
- **Nút mở phong bì:** 6 phong bì (1–6), `onClick` mở modal nhập mã / captcha.
- **Enter:** toast “Đang kiểm tra mã: {code}” hoặc “Vui lòng nhập mã!”.

### 3.3 Luồng xử lý

1. **Nhập mã → bấm phong bì / Enter**  
   - Nếu trống → hiện popup cảnh báo (warning).  
   - Có mã → mở **modal Captcha** (`Tx`), dùng hook `yx()` (state: `openModal`, `closeModal`, `captchaUrl`, `refreshCaptcha`, `token`).

2. **Submit Captcha (`C`):**  
   - Gọi `xx(M.trim(), captchaValue, m.token)` (kiểm tra mã + captcha).  
   - `status_code === 400` → “Captcha không đúng. Vui lòng nhập lại!”.  
   - `403` hoặc `valid === false` → “Mã code không hợp lệ” (dùng `title_mess`, `text_mess`).  
   - Thành công → mở modal kết quả `nR`: hiển thị `title_mess`, `promo_code`, `point`, `mess`, `time` (format `DD/MM/YYYY, H:mm:ss`).

3. **Modal kết quả (`nR`):**  
   - Nhập tên tài khoản → gọi `Bx(username, promoCode)` (cộng điểm).  
   - `status_code === 502` hoặc `valid !== true` → toast lỗi “Không thể cộng điểm”.  
   - Thành công → set `playerId`, `point`, mở modal thành công `dy`, reload sau khi đóng.

### 3.4 Danh sách người trúng

- Gọi `gx()` lấy danh sách (polling mỗi 10s).
- `status_code === 200` → dùng `result` (array), hiển thị: `time` (format `Y/MM/DD H:mm:ss`), `username`, `+{point} điểm thưởng`.

### 3.5 Toast & modal

- **Toast:** `Ry()` → `showToast` với `type` (success/error/warning), `message`, `duration`.
- **Loading:** `Wy()` → `withLoading`, `show`/`hide`, dùng cho “Đang xác thực Captcha...”, “Đang cộng điểm...”.
- **Popup cảnh báo:** state `warning`, `message`; có input mã và nút OK (`eR`).

---

## 4. API / service (tên gốc đã bị minify)

| Hàm (trong bundle) | Mục đích (suy ra) |
|--------------------|--------------------|
| `gx()` | GET danh sách người trúng thưởng (refresh ~10s) |
| `xx(code, captcha, token)` | POST kiểm tra mã + captcha, trả về `detail` (promo_code, point, mess, time), `valid`, `title_mess`, `text_mess` |
| `Bx(username, promoCode)` | POST cộng điểm vào tài khoản, trả về `player_id`, `point`, `valid` |

Response dùng `status_code` (200, 400, 403, 502), `valid`, `detail`, `title_mess`, `text_mess`.

---

## 5. Assets (import trong bundle)

- `bR` – logo chính (trong code ghi alt "Logo C168").
- `zR` – banner/dòng chữ phụ.
- `MR` – “Logo Banner” (cột trái).
- `gA` – ảnh phong bì lì xì.
- `pR` – ảnh popup cảnh báo.
- `eR` – nút OK.

Đường dẫn thực tế do Vite sinh (ví dụ `/assets/logo-xxx.png`). Đã thay nội dung logo bằng file `assets/logo.png` (GK88).

---

## 6. State / store (suy ra)

- **Mã nhập:** state local (biến `M`), set bằng `b(T.target.value)`.
- **Warning popup:** `r({ warning, message })`.
- **Modal kết quả:** `c({ title, promoCode, point, label, time })`, `e(!0)` mở, `e(!1)` đóng.
- **Modal thành công:** `n({ playerId, point })`, `t(!0)` mở; `p` = open, `O` = data (playerId, point).
- **Danh sách trúng:** `A([])` / `A(Y.result ?? [])` (array `i` trong render).
- **Captcha:** hook `yx()` (token, openModal, closeModal, captchaUrl, error, loading, refreshCaptcha).

---

## 7. Cách dùng lại / chỉnh sửa

- **Chỉnh text, API, logo:** Có thể tìm chuỗi tiếng Việt hoặc tên biến trong `index-_HslN23R.js` và sửa trực tiếp (dễ vỡ khi build lại).
- **Chỉnh logic thật sự:** Nên có **mã nguồn gốc** (React + Vite), sửa rồi build lại; bundle này không thay thế được source.
- **Tham khảo cấu trúc:** Xem thư mục `src-reconstructed/` (nếu có) – chỉ là skeleton/outline để đọc, không chạy đủ như bản build.
