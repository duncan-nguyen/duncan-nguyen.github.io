# portfolio

Portfolio tĩnh được refactor từ mô hình một file sang cấu trúc tách biệt giữa markup, style và behavior.

## Structure

```text
.
├── assets
│   ├── css
│   │   └── main.css
│   └── js
│       ├── main.js
│       └── tailwind-config.js
├── index.html
└── README.md
```

## Responsibilities

- `index.html`: chỉ giữ nội dung và semantic structure của trang.
- `assets/css/main.css`: chứa toàn bộ custom styles và animation ngoài Tailwind utility classes.
- `assets/js/tailwind-config.js`: chứa cấu hình theme cho Tailwind CDN.
- `assets/js/main.js`: chứa scroll reveal, active nav state và mobile menu interactions.

## Notes

- Refactor này giữ nguyên giao diện và hành vi hiện tại.
- Inline event handlers đã được loại bỏ để markup sạch hơn và dễ bảo trì hơn.