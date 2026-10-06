import { PARENT_QUESTION_LIMIT } from '../data/constants';
import type { Topic, TopicId } from '../types';
import { responseIncludesAny } from './cards';

export function getFollowupQuestions(topic: Topic | null, response: string): string[] {
  const topicQuestions: Record<TopicId, string[]> = {
    school: [
      'Con muốn kể thêm về bạn nào?',
      'Giờ ra chơi con làm gì?',
      'Có bài nào con thấy khó không?',
      'Ai làm con vui ở trường?',
      'Bữa trưa ở trường con ăn gì?',
      'Hoạt động nào ở trường con muốn làm lại?',
      'Ngày mai con muốn làm gì ở lớp?',
    ],
    food: [
      'Con muốn ăn thêm hay đủ rồi?',
      'Có món nào con không thích không?',
      'Con muốn uống gì sau bữa ăn?',
      'Con muốn ăn món đó lần nữa không?',
      'Con muốn thử món nào tiếp theo?',
      'Bữa sau con muốn ăn gì?',
      'Món đó nóng hay lạnh?',
    ],
    activities: [
      'Con muốn làm hoạt động đó với ai?',
      'Con muốn chơi ở đâu?',
      'Con muốn làm tiếp hay dừng lại?',
      'Con thích vẽ, nghe nhạc hay chơi trò chơi?',
      'Điều gì làm hoạt động đó vui?',
      'Con muốn vận động hay nghỉ chút?',
      'Con muốn chơi tiếp hay đổi sang hoạt động khác?',
    ],
    feelings: [
      'Mẹ có thể giúp con thế nào?',
      'Con muốn ở chỗ yên tĩnh hay gần mẹ?',
      'Mẹ nên nói nhỏ hay nói chậm với con?',
      'Con cần nghỉ hay uống nước?',
      'Con muốn ở gần ai lúc này?',
      'Mẹ cần làm gì để con thấy an toàn hơn?',
      'Điều gì làm con buồn hoặc sợ?',
      'Con muốn nghỉ hay nói thêm với mẹ?',
    ],
    family: [
      'Con muốn làm gì cùng ba mẹ?',
      'Con muốn ai ôm con nào?',
      'Hôm nay con có nhớ ai không?',
      'Con muốn kể chuyện cho ai nghe?',
      'Ai giúp con khi con cần?',
      'Con muốn chơi cùng ai lúc này?',
      'Điều gì làm cả nhà mình vui?',
    ],
    home: [
      'Ở nhà con thích làm gì nhất?',
      'Con muốn nghỉ ngơi hay chơi tiếp?',
      'Con đã đi tắm chưa?',
      'Phòng ngủ của con có mát không?',
      'Con muốn dọn đồ chơi cùng mẹ không?',
      'Con đã buồn ngủ chưa?',
      'Con thích góc nào nhất trong nhà?',
    ],
    toys: [
      'Hôm nay con muốn chơi món đồ chơi nào?',
      'Con thích gấu bông hay xe hơi?',
      'Món đồ chơi nào con yêu quý nhất?',
      'Con muốn xếp hình cùng ai?',
      'Con muốn chơi tiếp hay cất đồ chơi?',
      'Đồ chơi này có màu gì con thích?',
      'Con muốn mẹ giúp lắp đồ chơi không?',
    ],
    health: [
      'Bây giờ trong người con thấy thế nào?',
      'Con có bị đau ở đâu không?',
      'Con thấy nóng hay thấy lạnh?',
      'Con có muốn uống nước không?',
      'Con có cần đi vệ sinh không?',
      'Con có thấy mệt muốn nằm nghỉ không?',
      'Mẹ có thể làm gì để con đỡ hơn?',
    ],
    park: [
      'Con có thích đi công viên không?',
      'Ở công viên con thích chơi trò nào nhất?',
      'Con muốn trượt cầu trượt hay đu xích đu?',
      'Con có thấy nhiều cây xanh không?',
      'Hôm nay con chơi cùng bạn nào ở công viên?',
      'Con muốn chơi tiếp hay về nhà?',
      'Lần sau con muốn đi công viên nữa không?',
    ],
    shopping: [
      'Hôm nay con đi siêu thị mua gì?',
      'Con có thích đẩy xe đẩy không?',
      'Có món bánh kẹo nào con thích không?',
      'Con có thấy đông người không?',
      'Con muốn chọn món gì cho cả nhà?',
      'Con có muốn uống sữa chua hay nước cam?',
      'Con có vui khi đi siêu thị cùng mẹ không?',
    ],
    animals: [
      'Con thích con vật nào nhất?',
      'Con có thích bạn cún hay bạn mèo hơn?',
      'Con vật đó kêu như thế nào?',
      'Con có dám vuốt ve bạn cún không?',
      'Con có thấy bạn mèo dễ thương không?',
      'Con có muốn đi sở thú xem thú không?',
      'Con muốn cho bạn cún ăn gì?',
    ],
    vehicles: [
      'Con thích đi phương tiện nào nhất?',
      'Hôm nay con đi bằng xe gì?',
      'Con thích xe ô tô màu gì?',
      'Con có thích nhìn xe chạy trên đường không?',
      'Con đã từng đi máy bay chưa?',
      'Xe buýt có to không con?',
      'Con có thích đi xe đạp không?',
    ],
  };

  const suggested: string[] = [];
  const topicId = topic?.id;
  const positive = responseIncludesAny(response, ['Vui', 'Thích', 'Rất thích', 'Hào hứng', 'Tự hào', 'Ngon', 'Đỡ hơn', 'An toàn', 'Bình tĩnh']);

  if (topic?.id === 'school') {
    if (responseIncludesAny(response, ['Cô giáo', 'Làm xong', 'Tự hào'])) suggested.push('Con muốn kể thêm về cô giáo không?');
    if (responseIncludesAny(response, ['Bạn', 'Bạn thân', 'Nhóm bạn', 'Chơi cầu trượt'])) suggested.push('Con muốn kể thêm về bạn nào?');
    if (responseIncludesAny(response, ['Khó', 'Cần giúp', 'Giúp con', 'Lo', 'Khó nói'])) suggested.push('Mẹ có thể giúp con ở phần nào?');
    if (responseIncludesAny(response, ['Ăn trưa', 'Cơm', 'Phở', 'Bánh mì', 'Súp', 'No', 'Ngon'])) suggested.push('Bữa trưa ở trường con ăn gì?');
    if (responseIncludesAny(response, ['Sân chơi', 'Chơi', 'Chạy', 'Chờ lượt'])) suggested.push('Giờ ra chơi con làm gì?');
  }

  if (topic?.id === 'food') {
    if (responseIncludesAny(response, ['Nóng', 'Lạnh', 'Mặn', 'Ngọt'])) suggested.push('Món đó nóng hay lạnh?');
    if (responseIncludesAny(response, ['Không thích', 'Khó chịu', 'Chán'])) suggested.push('Có món nào con không thích không?');
    if (responseIncludesAny(response, ['No', 'Đủ rồi', 'Ăn thêm', 'Muốn thêm', 'Ăn ít'])) suggested.push('Con muốn ăn thêm hay đủ rồi?');
    if (responseIncludesAny(response, ['Uống', 'Nước', 'Sữa', 'Nước cam', 'Sinh tố'])) suggested.push('Con muốn uống gì sau bữa ăn?');
    if (positive) suggested.push('Con muốn ăn món đó lần nữa không?');
  }

  if (topic?.id === 'activities') {
    if (responseIncludesAny(response, ['Mẹ', 'Ba', 'Bạn bè', 'Một mình', 'Chơi cầu trượt'])) suggested.push('Con muốn làm hoạt động đó với ai?');
    if (responseIncludesAny(response, ['Sân chơi', 'Ở nhà', 'Ở trường', 'Chỗ yên tĩnh'])) suggested.push('Con muốn chơi ở đâu?');
    if (responseIncludesAny(response, ['Dừng lại', 'Chán', 'Mệt', 'Nghỉ'])) suggested.push('Con muốn làm tiếp hay dừng lại?');
    if (responseIncludesAny(response, ['Vẽ', 'Vẽ tranh', 'Màu sắc', 'Âm nhạc', 'Tạo hình'])) suggested.push('Con thích vẽ, nghe nhạc hay chơi trò chơi?');
    if (responseIncludesAny(response, ['Chạy', 'Đá bóng', 'Cơ thể'])) suggested.push('Con muốn vận động hay nghỉ chút?');
    if (positive) suggested.push('Điều gì làm hoạt động đó vui?');
  }

  if (topic?.id === 'feelings') {
    if (responseIncludesAny(response, ['Mệt', 'Khó chịu', 'Cơ thể', 'Tiếng ồn', 'Ánh sáng'])) suggested.push('Trong người con có mệt hay khó chịu không?');
    if (responseIncludesAny(response, ['Nghỉ', 'Uống nước', 'Chỗ nghỉ', 'Ghế nghỉ', 'Đỡ hơn'])) suggested.push('Con cần nghỉ hay uống nước?');
    if (responseIncludesAny(response, ['Mẹ', 'Muốn ôm', 'Ngồi gần', 'An toàn', 'Bình tĩnh', 'Lo'])) suggested.push('Con muốn ở chỗ yên tĩnh hay gần mẹ?');
    if (responseIncludesAny(response, ['Nói nhỏ', 'Nói chậm', 'Khó nói', 'Không biết'])) suggested.push('Mẹ nên nói nhỏ hay nói chậm với con?');
    if (responseIncludesAny(response, ['Buồn', 'Giận', 'Sợ'])) suggested.push('Điều gì làm con buồn hoặc sợ?');
    if (responseIncludesAny(response, ['Cần giúp', 'Giúp con'])) suggested.push('Mẹ có thể giúp con thế nào?');
  }

  if (positive) suggested.push('Điều gì làm con vui nhất?');
  suggested.push('Con có muốn kể thêm cho mẹ không?');

  return [...suggested, ...(topicId ? topicQuestions[topicId] : [])]
    .filter((question, index, list) => list.indexOf(question) === index)
    .slice(0, PARENT_QUESTION_LIMIT);
}
