# Application

## Đăng ký, đăng nhập
- Sử dụng bcrypt
- Cơ chế hoạt động : tạo 1 salt random. Mật khẩu lưu vào database sẽ bao gồm salt và hash(mật khẩu + salt). Có salt round để quyết định hash hết bao nhiêu thời gian. Nên hacker có dùng siêu máy tính, chỉ cần tăng salt round thì cũng không thể mò mật khẩu nhanh chóng được

## Xác thực người dùng
- ### Cách thức thực hiện : sử dụng JsonWebToken kết hợp với 2 cookie
    - Khi user đăng nhập thành công, lưu 1 số thông tin như tên, avatar, đã xác thực email... vào payload. Sử dụng JWT tạo 1 chuỗi format *header.payload.signature*
    - *Header.payload* được lưu vào cookie, hết hạn sau 30 phút 
    - *Signature* được lưu vào cookie, set httpOnly, để JavaScript không thể đọc được cookie, phòng trường hợp người dùng bị XSS Attack
    - Để phòng tránh *CSRF*, mỗi khi request lên server ta sẽ gửi kèm header *X-Requested-With: XMLHttpRequest*. Header này sẽ không thể set nếu khác domain
    - Khi user request lên server, server sẽ lấy header, payload, signature trong cookie, xác thực chúng. Nếu thành công, server sẽ tạo ra 1 JWT mới, set lại thời gian hết hạn của cookie *header.payload*

## Đăng xuất
- Xóa cookie

## Upload ảnh
- Sử dụng ```Cloudinary``` và ```Multer```







