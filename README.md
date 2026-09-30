#  Dự án Khoa học Kỹ thuật 2026: Spektrum

Spektrum là một ứng dụng giao tiếp hỗ trợ trên iPad, được xây dựng nhằm giúp trẻ có khả năng ngôn ngữ hạn chế giao tiếp dễ dàng hơn với cha mẹ hoặc người hỗ trợ.

Ứng dụng kết hợp giao tiếp AAC (Augmentative and Alternative Communication) với AI để gợi ý câu hỏi và hỗ trợ duy trì cuộc trò chuyện theo ngữ cảnh.

## Quy trình sử dụng

1. Chọn chủ đề cuộc trò chuyện
2. AI gợi ý câu hỏi cho phụ huynh
3. Trẻ trả lời bằng các thẻ AAC theo chủ đề, hành động hoặc cảm xúc
4. Thiết bị đọc thành tiếng câu trả lời đã chọn
5. AI gợi ý câu hỏi tiếp theo dựa trên cuộc trò chuyện
6. Tiếp tục tương tác trong giao diện hội thoại
7. Xem phần tổng kết sau mỗi phiên
8. Lưu lại lịch sử các cuộc trò chuyện trên thiết bị

## Công nghệ AI

Spektrum sử dụng **Gemini 2.5 Lite** để tạo các câu hỏi và gợi ý tiếp theo dựa trên nội dung cuộc trò chuyện.

AI được sử dụng nhằm giúp cuộc trò chuyện tự nhiên và phù hợp với ngữ cảnh hơn, trong khi trẻ vẫn giao tiếp thông qua hệ thống thẻ AAC.

## Chạy ứng dụng trên máy tính

Cài đặt các package cần thiết:

```bash
npm install
npm run dev
