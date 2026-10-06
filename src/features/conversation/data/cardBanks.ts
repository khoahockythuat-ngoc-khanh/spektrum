import type { CardBank, TopicId } from '../types';

export const CARD_BANKS = {
  schoolDay: {
    topic: [['🏫', 'Lớp học'], ['🛝', 'Sân trường'], ['👩‍🏫', 'Cô giáo'], ['👫', 'Bạn bè']],
    action: [['📚', 'Học bài'], ['⚽️', 'Chơi'], ['🍱', 'Ăn trưa'], ['🎨', 'Vẽ']],
    emotion: [['😀', 'Vui'], ['👍', 'Thích'], ['😴', 'Mệt'], ['😐', 'Bình thường']],
  },
  schoolSubjects: {
    topic: [['🔢', 'Toán'], ['📖', 'Tiếng Việt'], ['🔤', 'Tiếng Anh'], ['🎨', 'Mỹ thuật']],
    action: [['💬', 'Kể chuyện'], ['✏️', 'Viết'], ['🔢', 'Đếm số'], ['🖍️', 'Tô màu']],
    emotion: [['😀', 'Vui'], ['🧩', 'Khó'], ['🙂', 'Dễ'], ['👍', 'Thích']],
  },
  schoolFriends: {
    topic: [['👫', 'Bạn thân'], ['👥', 'Nhóm bạn'], ['👩‍🏫', 'Cô giáo'], ['🙂', 'Một mình']],
    action: [['🛝', 'Chơi cầu trượt'], ['💬', 'Nói chuyện'], ['🤲', 'Chia sẻ'], ['⏳', 'Đợi bạn']],
    emotion: [['😀', 'Vui'], ['👍', 'Thích'], ['😳', 'Ngại'], ['😢', 'Buồn']],
  },
  schoolHappiness: {
    topic: [['👫', 'Bạn bè'], ['👩‍🏫', 'Cô giáo'], ['🛝', 'Sân chơi'], ['📚', 'Học bài']],
    action: [['🛝', 'Chơi cầu trượt'], ['🤲', 'Chia sẻ'], ['✅', 'Làm xong'], ['💬', 'Kể chuyện']],
    emotion: [['😀', 'Vui'], ['🤩', 'Hào hứng'], ['😌', 'Tự hào'], ['👍', 'Thích']],
  },
  schoolRepeat: {
    topic: [['📚', 'Học bài'], ['⚽️', 'Chơi'], ['🎨', 'Vẽ tranh'], ['📖', 'Đọc sách']],
    action: [['🔁', 'Làm tiếp'], ['▶️', 'Chơi tiếp'], ['✅', 'Làm xong'], ['💬', 'Kể chuyện']],
    emotion: [['🤩', 'Mong chờ'], ['😀', 'Vui'], ['👍', 'Thích'], ['😐', 'Bình thường']],
  },
  schoolTomorrow: {
    topic: [['📚', 'Học bài'], ['📖', 'Đọc sách'], ['🎨', 'Vẽ tranh'], ['👫', 'Bạn bè']],
    action: [['📚', 'Học tiếp'], ['▶️', 'Chơi tiếp'], ['💬', 'Nói chuyện'], ['🖍️', 'Tô màu']],
    emotion: [['🤩', 'Mong chờ'], ['😀', 'Vui'], ['😐', 'Bình thường'], ['😟', 'Lo']],
  },
  schoolPlay: {
    topic: [['🛝', 'Sân chơi'], ['👫', 'Bạn bè'], ['🎮', 'Trò chơi'], ['🙂', 'Một mình']],
    action: [['⚽️', 'Chơi'], ['🛝', 'Chơi cầu trượt'], ['🏃', 'Chạy'], ['⏳', 'Chờ lượt']],
    emotion: [['😀', 'Vui'], ['🤩', 'Hào hứng'], ['😳', 'Ngại'], ['😐', 'Bình thường']],
  },
  schoolDifficulty: {
    topic: [['🔢', 'Toán'], ['📖', 'Tiếng Việt'], ['🔤', 'Tiếng Anh'], ['🎨', 'Mỹ thuật']],
    action: [['💬', 'Kể chuyện'], ['✏️', 'Viết'], ['🔢', 'Đếm số'], ['🆘', 'Cần giúp']],
    emotion: [['🧩', 'Khó'], ['🙂', 'Dễ'], ['😐', 'Bình thường'], ['😌', 'Tự hào']],
  },
  schoolPeopleMoment: {
    topic: [['👩‍🏫', 'Cô giáo'], ['👫', 'Bạn thân'], ['👥', 'Nhóm bạn'], ['👫', 'Bạn bè']],
    action: [['💬', 'Nói chuyện'], ['🤲', 'Chia sẻ'], ['🛝', 'Chơi cầu trượt'], ['💬', 'Kể chuyện']],
    emotion: [['😀', 'Vui'], ['😌', 'Tự hào'], ['👍', 'Thích'], ['😳', 'Ngại']],
  },
  schoolLunch: {
    topic: [['🍚', 'Cơm'], ['🍜', 'Phở'], ['🥖', 'Bánh mì'], ['🥣', 'Súp']],
    action: [['🍱', 'Ăn trưa'], ['✅', 'Ăn hết'], ['🥄', 'Ăn ít'], ['💧', 'Uống nước']],
    emotion: [['😋', 'Ngon'], ['👍', 'Thích'], ['🙅', 'Không thích'], ['🙂', 'No rồi']],
  },
  foodMeals: {
    topic: [['🍚', 'Cơm'], ['🍜', 'Phở'], ['🥖', 'Bánh mì'], ['🥣', 'Súp']],
    action: [['🍽️', 'Ăn'], ['✅', 'Ăn hết'], ['🥄', 'Ăn ít'], ['✅', 'Đủ rồi']],
    emotion: [['😋', 'Ngon'], ['👍', 'Thích'], ['🙅', 'Không thích'], ['🙂', 'No rồi']],
  },
  foodFavorites: {
    topic: [['🍜', 'Phở'], ['🍚', 'Cơm'], ['🍎', 'Trái cây'], ['🥛', 'Sữa chua']],
    action: [['👉', 'Chọn món'], ['🍽️', 'Ăn'], ['✅', 'Ăn hết'], ['🥄', 'Ăn ít']],
    emotion: [['🤩', 'Rất thích'], ['😋', 'Ngon'], ['🙂', 'Bình thường'], ['🙅', 'Không thích']],
  },
  foodTaste: {
    topic: [['🍽️', 'Món ăn'], ['🧂', 'Mặn'], ['🍯', 'Ngọt'], ['♨️', 'Nóng']],
    action: [['🥄', 'Ăn ít'], ['🥤', 'Uống nước'], ['✅', 'Đủ rồi'], ['🔄', 'Đổi món']],
    emotion: [['😋', 'Ngon'], ['🙂', 'Bình thường'], ['🙅', 'Không thích'], ['😣', 'Khó chịu']],
  },
  foodAgain: {
    topic: [['🍽️', 'Món ăn'], ['🍚', 'Cơm'], ['🍜', 'Phở'], ['🥣', 'Súp']],
    action: [['🔁', 'Ăn lại'], ['✅', 'Đủ rồi'], ['⏰', 'Để sau'], ['🔄', 'Đổi món']],
    emotion: [['👍', 'Thích'], ['😋', 'Ngon'], ['🙂', 'Bình thường'], ['🙅', 'Không thích']],
  },
  foodDrink: {
    topic: [['💧', 'Nước'], ['🥛', 'Sữa'], ['🍊', 'Nước cam'], ['🥤', 'Sinh tố']],
    action: [['🥤', 'Uống'], ['💧', 'Uống nước'], ['🥤', 'Uống ít'], ['✅', 'Đủ rồi']],
    emotion: [['👍', 'Thích'], ['🧊', 'Mát'], ['😋', 'Ngon'], ['🙅', 'Không thích']],
  },
  foodEnough: {
    topic: [['🍽️', 'Món ăn'], ['🍚', 'Cơm'], ['🥣', 'Súp'], ['🥛', 'Sữa chua']],
    action: [['➕', 'Ăn thêm'], ['✅', 'Đủ rồi'], ['🥄', 'Ăn ít'], ['💧', 'Uống nước']],
    emotion: [['🙂', 'No rồi'], ['😋', 'Ngon'], ['😐', 'Bình thường'], ['🙅', 'Không thích']],
  },
  foodDislike: {
    topic: [['🍚', 'Cơm'], ['🍜', 'Phở'], ['🥖', 'Bánh mì'], ['🥣', 'Súp']],
    action: [['🔄', 'Đổi món'], ['🥄', 'Ăn ít'], ['⏰', 'Để sau'], ['💧', 'Uống nước']],
    emotion: [['🙅', 'Không thích'], ['😣', 'Khó chịu'], ['😐', 'Chán'], ['🙂', 'Bình thường']],
  },
  foodTemperature: {
    topic: [['♨️', 'Nóng'], ['🧊', 'Lạnh'], ['🧊', 'Mát'], ['🍽️', 'Món ăn']],
    action: [['💧', 'Uống nước'], ['⏰', 'Để sau'], ['🥄', 'Ăn ít'], ['✅', 'Đủ rồi']],
    emotion: [['😋', 'Ngon'], ['😣', 'Khó chịu'], ['🙂', 'Bình thường'], ['🙅', 'Không thích']],
  },
  foodNextMeal: {
    topic: [['🍚', 'Cơm'], ['🍜', 'Phở'], ['🥖', 'Bánh mì'], ['🥣', 'Súp']],
    action: [['👉', 'Chọn món'], ['🍽️', 'Ăn'], ['🔄', 'Đổi món'], ['⏰', 'Để sau']],
    emotion: [['👍', 'Thích'], ['🤩', 'Rất thích'], ['😋', 'Ngon'], ['🙂', 'Bình thường']],
  },
  activitiesChoice: {
    topic: [['🎨', 'Vẽ'], ['⚽️', 'Đá bóng'], ['🧩', 'Xếp hình'], ['📖', 'Đọc sách']],
    action: [['▶️', 'Chơi'], ['▶️', 'Chơi tiếp'], ['👩', 'Làm cùng mẹ'], ['⏸️', 'Nghỉ chút']],
    emotion: [['😀', 'Vui'], ['🤩', 'Rất thích'], ['😐', 'Bình thường'], ['😕', 'Chán']],
  },
  activitiesFavorite: {
    topic: [['🎨', 'Vẽ'], ['⚽️', 'Đá bóng'], ['🧩', 'Xếp hình'], ['📖', 'Đọc sách']],
    action: [['🔁', 'Làm tiếp'], ['▶️', 'Chơi tiếp'], ['👩', 'Làm cùng mẹ'], ['🤲', 'Chia sẻ']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['😌', 'Tự hào'], ['😐', 'Bình thường']],
  },
  activitiesPartner: {
    topic: [['👩', 'Mẹ'], ['👨', 'Ba'], ['👫', 'Bạn bè'], ['🙂', 'Một mình']],
    action: [['👩', 'Làm cùng mẹ'], ['💬', 'Nói chuyện'], ['🤲', 'Chia sẻ'], ['⏳', 'Chờ lượt']],
    emotion: [['😀', 'Vui'], ['👍', 'Thích'], ['😳', 'Ngại'], ['😐', 'Bình thường']],
  },
  activitiesFun: {
    topic: [['🌈', 'Màu sắc'], ['🎵', 'Âm nhạc'], ['👫', 'Bạn bè'], ['🎮', 'Trò chơi']],
    action: [['😄', 'Cười'], ['🏃', 'Chạy'], ['🧱', 'Tạo hình'], ['🌟', 'Thắng']],
    emotion: [['😀', 'Vui'], ['🤩', 'Hào hứng'], ['😌', 'Tự hào'], ['👍', 'Thích']],
  },
  activitiesPlace: {
    topic: [['🛝', 'Sân chơi'], ['🏠', 'Ở nhà'], ['🏫', 'Ở trường'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['▶️', 'Chơi'], ['🛝', 'Chơi cầu trượt'], ['🏃', 'Chạy'], ['⏸️', 'Nghỉ chút']],
    emotion: [['😀', 'Vui'], ['🤩', 'Hào hứng'], ['🙂', 'Bình tĩnh'], ['😕', 'Chán']],
  },
  activitiesContinue: {
    topic: [['🎮', 'Trò chơi'], ['🧩', 'Xếp hình'], ['📖', 'Đọc sách'], ['🎨', 'Vẽ tranh']],
    action: [['🔁', 'Làm tiếp'], ['▶️', 'Chơi tiếp'], ['⏹️', 'Dừng lại'], ['⏸️', 'Nghỉ chút']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['😕', 'Chán'], ['😴', 'Mệt']],
  },
  activitiesCreative: {
    topic: [['🖼️', 'Bàn vẽ'], ['🎵', 'Âm nhạc'], ['🎨', 'Vẽ tranh'], ['🎮', 'Trò chơi']],
    action: [['🖍️', 'Tô màu'], ['🎨', 'Vẽ'], ['😄', 'Cười'], ['🧱', 'Tạo hình']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['😌', 'Tự hào'], ['😐', 'Bình thường']],
  },
  activitiesMovement: {
    topic: [['⚽️', 'Đá bóng'], ['🛝', 'Sân chơi'], ['🧍', 'Cơ thể'], ['🛋️', 'Chỗ nghỉ']],
    action: [['🏃', 'Chạy'], ['⚽️', 'Đá bóng'], ['🛋️', 'Nghỉ'], ['💧', 'Uống nước']],
    emotion: [['😴', 'Mệt'], ['🤩', 'Hào hứng'], ['😀', 'Vui'], ['😐', 'Bình thường']],
  },
  feelingsNow: {
    topic: [['🧍', 'Cơ thể'], ['🔊', 'Tiếng ồn'], ['💡', 'Ánh sáng'], ['🛋️', 'Chỗ nghỉ']],
    action: [['🛋️', 'Nghỉ'], ['💧', 'Uống nước'], ['🤗', 'Muốn ôm'], ['🗣️', 'Nói nhỏ']],
    emotion: [['😀', 'Vui'], ['😢', 'Buồn'], ['😴', 'Mệt'], ['😨', 'Sợ']],
  },
  feelingsUncomfortable: {
    topic: [['🔊', 'Tiếng ồn'], ['💡', 'Ánh sáng'], ['🏫', 'Phòng học'], ['🧍', 'Cơ thể']],
    action: [['🛋️', 'Nghỉ'], ['💧', 'Uống nước'], ['🗣️', 'Nói nhỏ'], ['🤫', 'Chỗ yên tĩnh']],
    emotion: [['😣', 'Khó chịu'], ['😟', 'Lo'], ['😴', 'Mệt'], ['😨', 'Sợ']],
  },
  feelingsHelp: {
    topic: [['👩', 'Mẹ'], ['👨', 'Ba'], ['👩‍🏫', 'Cô giáo'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['🤗', 'Muốn ôm'], ['🆘', 'Cần giúp'], ['⏳', 'Nói chậm'], ['🤝', 'Ngồi gần']],
    emotion: [['😌', 'Đỡ hơn'], ['😟', 'Lo'], ['😴', 'Mệt'], ['😣', 'Khó nói']],
  },
  feelingsComfort: {
    topic: [['👩', 'Mẹ'], ['🛋️', 'Chỗ nghỉ'], ['🏠', 'Ở nhà'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['⏸️', 'Nghỉ chút'], ['💬', 'Nói thêm'], ['🌬️', 'Thở chậm'], ['🤝', 'Ngồi gần']],
    emotion: [['😌', 'An toàn'], ['🙂', 'Bình tĩnh'], ['😴', 'Mệt'], ['😣', 'Khó chịu']],
  },
  feelingsNear: {
    topic: [['👩', 'Mẹ'], ['👨', 'Ba'], ['👩‍🏫', 'Cô giáo'], ['👫', 'Bạn bè']],
    action: [['🤝', 'Ngồi gần'], ['🤗', 'Muốn ôm'], ['🗣️', 'Nói nhỏ'], ['🤫', 'Chỗ yên tĩnh']],
    emotion: [['😌', 'An toàn'], ['🙂', 'Bình tĩnh'], ['😟', 'Lo'], ['😣', 'Khó nói']],
  },
  feelingsBody: {
    topic: [['🧍', 'Cơ thể'], ['🛋️', 'Chỗ nghỉ'], ['💧', 'Nước'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['🛋️', 'Nghỉ'], ['💧', 'Uống nước'], ['🆘', 'Cần giúp'], ['🗣️', 'Nói nhỏ']],
    emotion: [['😴', 'Mệt'], ['😣', 'Khó chịu'], ['😨', 'Sợ'], ['😐', 'Bình thường']],
  },
  feelingsQuiet: {
    topic: [['👩', 'Mẹ'], ['🤫', 'Chỗ yên tĩnh'], ['🛋️', 'Chỗ nghỉ'], ['🏠', 'Ở nhà']],
    action: [['🤝', 'Ngồi gần'], ['🤗', 'Muốn ôm'], ['⏸️', 'Nghỉ chút'], ['🌬️', 'Thở chậm']],
    emotion: [['😌', 'An toàn'], ['🙂', 'Bình tĩnh'], ['😌', 'Đỡ hơn'], ['😟', 'Lo']],
  },
  feelingsSpeak: {
    topic: [['👩', 'Mẹ'], ['🤫', 'Chỗ yên tĩnh'], ['🔊', 'Tiếng ồn'], ['🏫', 'Phòng học']],
    action: [['🗣️', 'Nói nhỏ'], ['⏳', 'Nói chậm'], ['🔁', 'Nói lại'], ['⏹️', 'Dừng lại']],
    emotion: [['😣', 'Khó nói'], ['😟', 'Lo'], ['🙂', 'Bình tĩnh'], ['😴', 'Mệt']],
  },
  feelingsUpset: {
    topic: [['🔊', 'Tiếng ồn'], ['💡', 'Ánh sáng'], ['👫', 'Bạn bè'], ['🧍', 'Cơ thể']],
    action: [['💬', 'Nói thêm'], ['⏸️', 'Nghỉ chút'], ['🆘', 'Cần giúp'], ['🤫', 'Chỗ yên tĩnh']],
    emotion: [['😢', 'Buồn'], ['😡', 'Giận'], ['😨', 'Sợ'], ['😣', 'Khó chịu']],
  },
  feelingsRest: {
    topic: [['🧍', 'Cơ thể'], ['🛋️', 'Chỗ nghỉ'], ['💧', 'Nước'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['🛋️', 'Nghỉ'], ['💧', 'Uống nước'], ['🌬️', 'Thở chậm'], ['🤝', 'Ngồi gần']],
    emotion: [['😴', 'Mệt'], ['😌', 'Đỡ hơn'], ['🙂', 'Bình tĩnh'], ['😣', 'Khó chịu']],
  },
  generalMore: {
    topic: [['👩', 'Mẹ'], ['👩‍🏫', 'Cô giáo'], ['👫', 'Bạn bè'], ['🏠', 'Ở nhà']],
    action: [['💬', 'Kể chuyện'], ['💬', 'Nói thêm'], ['🔁', 'Nói lại'], ['⏸️', 'Nghỉ chút']],
    emotion: [['😀', 'Vui'], ['😟', 'Lo'], ['😐', 'Bình thường'], ['😣', 'Khó nói']],
  },
  happinessReason: {
    topic: [['👫', 'Bạn bè'], ['👩', 'Mẹ'], ['🎮', 'Trò chơi'], ['🍽️', 'Món ăn']],
    action: [['🛝', 'Chơi cầu trượt'], ['💬', 'Kể chuyện'], ['✅', 'Làm xong'], ['🤲', 'Chia sẻ']],
    emotion: [['😀', 'Vui'], ['😌', 'Tự hào'], ['🤩', 'Rất thích'], ['😐', 'Bình thường']],
  },
  familyHome: {
    topic: [['👩', 'Mẹ'], ['👨', 'Ba'], ['👴', 'Ông'], ['👵', 'Bà']],
    action: [['🤗', 'Muốn ôm'], ['💬', 'Nói chuyện'], ['🤝', 'Ngồi gần'], ['🤲', 'Chia sẻ']],
    emotion: [['😀', 'Vui'], ['👍', 'Thích'], ['😌', 'An toàn'], ['😐', 'Bình thường']],
  },
  homeRoutine: {
    topic: [['🏠', 'Ở nhà'], ['🛏️', 'Phòng ngủ'], ['🛋️', 'Chỗ nghỉ'], ['🤫', 'Chỗ yên tĩnh']],
    action: [['🛋️', 'Nghỉ'], ['😴', 'Đi ngủ'], ['🧼', 'Đi tắm'], ['🎮', 'Trò chơi']],
    emotion: [['😌', 'An toàn'], ['😀', 'Vui'], ['😴', 'Mệt'], ['🙂', 'Bình tĩnh']],
  },
  toysPlay: {
    topic: [['🧸', 'Gấu bông'], ['🧩', 'Xếp hình'], ['🚗', 'Xe hơi'], ['🎨', 'Vẽ tranh']],
    action: [['⚽️', 'Chơi'], ['🔁', 'Làm tiếp'], ['🤲', 'Chia sẻ'], ['⏹️', 'Dừng lại']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['👍', 'Thích'], ['😐', 'Bình thường']],
  },
  healthBody: {
    topic: [['🧍', 'Cơ thể'], ['🩺', 'Bác sĩ'], ['💧', 'Nước'], ['🛋️', 'Chỗ nghỉ']],
    action: [['🛋️', 'Nghỉ'], ['💧', 'Uống nước'], ['🆘', 'Cần giúp'], ['🗣️', 'Nói nhỏ']],
    emotion: [['😣', 'Đau'], ['😴', 'Mệt'], ['😣', 'Khó chịu'], ['😌', 'Đỡ hơn']],
  },
  parkOutdoor: {
    topic: [['🌳', 'Công viên'], ['🛝', 'Cầu trượt'], ['🎪', 'Xích đu'], ['👫', 'Bạn bè']],
    action: [['⚽️', 'Chơi'], ['🏃', 'Chạy'], ['🛝', 'Chơi cầu trượt'], ['🚶', 'Đi dạo']],
    emotion: [['🤩', 'Hào hứng'], ['😀', 'Vui'], ['👍', 'Thích'], ['😴', 'Mệt']],
  },
  shoppingStore: {
    topic: [['🛒', 'Siêu thị'], ['🥖', 'Bánh mì'], ['🍎', 'Trái cây'], ['🥛', 'Sữa']],
    action: [['🛒', 'Mua sắm'], ['👉', 'Chọn món'], ['🚶', 'Đi dạo'], ['⏳', 'Chờ lượt']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['👍', 'Thích'], ['😐', 'Bình thường']],
  },
  animalsPets: {
    topic: [['🐶', 'Chó'], ['🐱', 'Mèo'], ['🦁', 'Động vật'], ['🌳', 'Công viên']],
    action: [['🚶', 'Đi dạo'], ['🍽️', 'Cho ăn'], ['💬', 'Kể chuyện'], ['👀', 'Xem']],
    emotion: [['🤩', 'Rất thích'], ['😀', 'Vui'], ['👍', 'Thích'], ['😨', 'Sợ']],
  },
  vehiclesRide: {
    topic: [['🚗', 'Xe hơi'], ['🚌', 'Xe buýt'], ['🚲', 'Xe đạp'], ['✈️', 'Máy bay']],
    action: [['🚶', 'Đi dạo'], ['👀', 'Xem'], ['💬', 'Kể chuyện'], ['⏹️', 'Dừng lại']],
    emotion: [['🤩', 'Hào hứng'], ['😀', 'Vui'], ['👍', 'Thích'], ['😐', 'Bình thường']],
  },
} satisfies Record<string, CardBank>;

export type CardBankKey = keyof typeof CARD_BANKS;

type ContextualQuestionBank = Partial<Record<TopicId, CardBankKey>> & {
  fallback: CardBankKey;
};

export const QUESTION_CARD_BANK_KEYS: Record<string, CardBankKey> = {
  'Hôm nay con học gì ở trường?': 'schoolSubjects',
  'Hôm nay con đã làm gì ở trường?': 'schoolDay',
  'Điều gì làm con vui nhất ở trường hôm nay?': 'schoolHappiness',
  'Hôm nay con chơi với ai?': 'schoolFriends',
  'Giờ ra chơi con làm gì?': 'schoolPlay',
  'Có bài nào con thấy khó không?': 'schoolDifficulty',
  'Mẹ có thể giúp con ở phần nào?': 'schoolDifficulty',
  'Ai làm con vui ở trường?': 'schoolPeopleMoment',
  'Con muốn kể thêm về cô giáo không?': 'schoolPeopleMoment',
  'Bữa trưa ở trường con ăn gì?': 'schoolLunch',
  'Con muốn kể thêm về bạn nào?': 'schoolFriends',
  'Hoạt động nào ở trường con muốn làm lại?': 'schoolRepeat',
  'Ngày mai con muốn làm gì ở lớp?': 'schoolTomorrow',
  'Hôm nay con ăn gì?': 'foodMeals',
  'Con đã ăn gì?': 'foodMeals',
  'Hôm nay con thích món gì nhất?': 'foodFavorites',
  'Món đó có ngon không?': 'foodTaste',
  'Con muốn ăn thêm hay đủ rồi?': 'foodEnough',
  'Có món nào con không thích không?': 'foodDislike',
  'Con uống gì hôm nay?': 'foodDrink',
  'Món đó nóng hay lạnh?': 'foodTemperature',
  'Con muốn ăn món đó lần nữa không?': 'foodAgain',
  'Con muốn thử món nào tiếp theo?': 'foodNextMeal',
  'Con muốn uống gì sau bữa ăn?': 'foodDrink',
  'Bữa sau con muốn ăn gì?': 'foodNextMeal',
  'Hôm nay con muốn làm gì?': 'activitiesChoice',
  'Hoạt động nào con thích nhất?': 'activitiesFavorite',
  'Con muốn làm cùng ai?': 'activitiesPartner',
  'Con muốn chơi ở đâu?': 'activitiesPlace',
  'Con muốn làm tiếp hay dừng lại?': 'activitiesContinue',
  'Hoạt động nào làm con cười?': 'activitiesFun',
  'Con thích vẽ, nghe nhạc hay chơi trò chơi?': 'activitiesCreative',
  'Con muốn vận động hay nghỉ chút?': 'activitiesMovement',
  'Con muốn làm hoạt động đó với ai?': 'activitiesPartner',
  'Con muốn chơi tiếp hay đổi sang hoạt động khác?': 'activitiesContinue',
  'Điều gì làm hoạt động đó vui?': 'activitiesFun',
  'Con đang cảm thấy thế nào?': 'feelingsNow',
  'Bây giờ con cảm thấy thế nào?': 'feelingsNow',
  'Có điều gì làm con không thoải mái không?': 'feelingsUncomfortable',
  'Con muốn mẹ giúp gì?': 'feelingsHelp',
  'Trong người con có mệt hay khó chịu không?': 'feelingsBody',
  'Con muốn ở chỗ yên tĩnh hay gần mẹ?': 'feelingsQuiet',
  'Mẹ nên nói nhỏ hay nói chậm với con?': 'feelingsSpeak',
  'Điều gì làm con buồn hoặc sợ?': 'feelingsUpset',
  'Con cần nghỉ hay uống nước?': 'feelingsRest',
  'Mẹ có thể giúp con thế nào?': 'feelingsHelp',
  'Mẹ cần làm gì để con thấy an toàn hơn?': 'feelingsQuiet',
  'Con muốn ở gần ai lúc này?': 'feelingsNear',
  'Con muốn nghỉ hay nói thêm với mẹ?': 'feelingsComfort',
};

export const CONTEXTUAL_QUESTION_CARD_BANK_KEYS: Record<string, ContextualQuestionBank> = {
  'Điều gì làm con vui nhất?': {
    school: 'schoolHappiness',
    food: 'foodFavorites',
    activities: 'activitiesFun',
    feelings: 'feelingsComfort',
    fallback: 'happinessReason',
  },
  'Con có muốn kể thêm cho mẹ không?': {
    school: 'schoolDay',
    food: 'foodMeals',
    activities: 'activitiesChoice',
    feelings: 'feelingsNow',
    fallback: 'generalMore',
  },
};

export const TOPIC_DEFAULT_CARD_BANK_KEYS: Record<TopicId, CardBankKey> = {
  school: 'schoolDay',
  food: 'foodMeals',
  activities: 'activitiesChoice',
  feelings: 'feelingsNow',
  family: 'familyHome',
  home: 'homeRoutine',
  toys: 'toysPlay',
  health: 'healthBody',
  park: 'parkOutdoor',
  shopping: 'shoppingStore',
  animals: 'animalsPets',
  vehicles: 'vehiclesRide',
};
