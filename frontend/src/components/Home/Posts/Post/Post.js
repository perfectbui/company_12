import React from "react";

import "./Post.css";

const post = (props) => {
  return (
    <div className="post">
      <div className="introduce-user">
        <i className="fas fa-user fa-2x" />
        <div className="name-date">
          <span>HaoBui</span>
          <span className="date">2h ago</span>
        </div>
      </div>
      <div className="content-post">
        [Hà Nội] Công ty FSS tuyển dụng Lập trình viên NodeJS 💚 Lương:
        400-1000$ 💚 Yêu cầu: Tốt nghiệp đại học chuyên ngành Công nghệ thông
        tin hoặc các ngành liên quan Kinh nghiệm làm việc: không bắt buộc Có
        kiến thức lập trình ít nhất một trong các ngôn ngữ sau: - Oracle SQL,
        PL/SQL - Microsoft SQL Server - NodeJS, React JS, Vue Ưu tiên ứng viên
        có kinh nghiệm trong lĩnh vực phần mềm tài chính, ngân hàng, chứng khoán
      </div>
      <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/81999271_1024935507877658_2253811267129049088_o.jpg?_nc_cat=106&ccb=2&_nc_sid=0debeb&_nc_ohc=BxBhZIVwwN8AX9ADLM8&_nc_ht=scontent.fsgn5-6.fna&oh=3b28e25b52e58985ba0a33dc373dcb41&oe=5FD48E6B" />
    </div>
  );
};

export default post;
