// ================================================
// CARTOON GALLERY - BÀI TẬP JAVASCRIPT TƯƠNG TÁC
// Các yêu cầu: mouseover, mouseleave, focus, blur,
// onload, keyboard và tự động thêm tabindex.
// ================================================

window.addEventListener("load", function () {
  console.log("Trang web đã tải xong - window load đã được kích hoạt.");

  const cards = document.querySelectorAll(".photo-card");
  const previewTitle = document.getElementById("preview-title");
  const previewDescription = document.getElementById("preview-description");
  const previewLabel = document.getElementById("preview-label");

  // Hàm cập nhật khu vực xem trước
  function updatePreview(card, method) {
    const title = card.dataset.title;
    const description = card.dataset.description;

    previewTitle.textContent = title;
    previewDescription.textContent = description;
    previewLabel.textContent = method;

    console.log(`Đã kích hoạt: ${method} -> ${title}`);
  }

  // Hàm xóa trạng thái active
  function resetCard(card) {
    card.classList.remove("is-active");
  }

  // ------------------------------------------------
  // 1. Thêm sự kiện mouseover và mouseleave
  // ------------------------------------------------
  cards.forEach(function (card) {
    card.addEventListener("mouseover", function () {
      card.classList.add("is-active");
      updatePreview(card, "MOUSEOVER");
    });

    card.addEventListener("mouseleave", function () {
      resetCard(card);
    });

    // ------------------------------------------------
    // 2. Thêm sự kiện focus và blur cho bàn phím
    // ------------------------------------------------
    card.addEventListener("focus", function () {
      card.classList.add("is-active");
      updatePreview(card, "FOCUS / TAB");
    });

    card.addEventListener("blur", function () {
      resetCard(card);
      console.log("Đã blur khỏi:", card.dataset.title);
    });

    // ------------------------------------------------
    // 3. Enter hoặc Space để kích hoạt bằng bàn phím
    // ------------------------------------------------
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.add("is-active");
        updatePreview(card, "KEYBOARD: " + event.key);

        // Hiệu ứng nhỏ để người dùng biết sự kiện đã chạy
        card.animate(
          [
            { transform: "translateY(-8px) scale(1)" },
            { transform: "translateY(-8px) scale(.97)" },
            { transform: "translateY(-8px) scale(1)" }
          ],
          { duration: 180 }
        );
      }
    });
  });

  // ------------------------------------------------
  // 4. Tự động thêm tabindex bằng JavaScript
  // Nếu một ảnh chưa có tabindex, JS sẽ thêm tabindex="0".
  // ------------------------------------------------
  const images = document.querySelectorAll("#gallery-grid img");

  images.forEach(function (image, index) {
    image.setAttribute("tabindex", "0");
    console.log(`Đã thêm tabindex="0" cho hình ảnh số ${index + 1}`);
  });

  // Cho ảnh cũng có thể focus. Khi focus vào ảnh, chuyển active
  // cho card chứa ảnh để trải nghiệm nhất quán.
  images.forEach(function (image) {
    image.addEventListener("focus", function () {
      const parentCard = image.closest(".photo-card");
      if (parentCard) {
        parentCard.classList.add("is-active");
        updatePreview(parentCard, "IMAGE FOCUS");
      }
    });

    image.addEventListener("blur", function () {
      const parentCard = image.closest(".photo-card");
      if (parentCard) resetCard(parentCard);
    });
  });

  // ------------------------------------------------
  // 5. Menu mobile
  // ------------------------------------------------
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");

  menuButton.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    console.log("Menu mobile:", isOpen ? "mở" : "đóng");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // ------------------------------------------------
  // 6. Kiểm tra alt để hỗ trợ accessibility
  // ------------------------------------------------
  let missingAlt = 0;

  images.forEach(function (image) {
    if (!image.hasAttribute("alt") || image.getAttribute("alt").trim() === "") {
      missingAlt++;
    }
  });

  console.log(`Kiểm tra accessibility: ${missingAlt} hình ảnh thiếu alt.`);

  // Thông báo kiểm tra trên console
  if (missingAlt === 0) {
    console.log("✓ Tất cả 6 hình ảnh đều có văn bản thay thế alt.");
  } else {
    console.warn("⚠ Có hình ảnh thiếu thuộc tính alt.");
  }
});
