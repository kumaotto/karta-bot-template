DROP TABLE IF EXISTS karta;

CREATE TABLE karta (
    id INTEGER PRIMARY KEY,
    karta_char TEXT NOT NULL,
    karta_content TEXT,
    karta_description TEXT
);

INSERT INTO karta (karta_char, karta_content, karta_description) VALUES
('あ', '', ''),
('い', '', ''),
('う', '', ''),
('え', '', ''),
('お', '', ''),
('か', '', ''),
('き', '', ''),
('く', '', ''),
('け', '', ''),
('こ', '', ''),
('さ', '', ''),
('し', '', ''),
('す', '', ''),
('す', '', ''),
('せ', '', ''),
('そ', '', ''),
('た', '', ''),
('ち', '', ''),
('ち', '', ''),
('ち', '', ''),
('つ', '', ''),
('て', '', ''),
('て', '', ''),
('と', '', ''),
('な', '', ''),
('に', '', ''),
('ぬ', '', ''),
('ね', '', ''),
('の', '', ''),
('は', '', ''),
('は', '', ''),
('ひ', '', ''),
('ふ', '', ''),
('へ', '', ''),
('ほ', '', ''),
('ま', '', ''),
('み', '', ''),
('む', '', ''),
('め', '', ''),
('も', '', ''),
('や', '', ''),
('ゆ', '', ''),
('よ', '', ''),
('ら', '', ''),
('り', '', ''),
('る', '', ''),
('れ', '', ''),
('ろ', '', ''),
('わ', '', ''),
('を', '', ''),
('ん', '', '');
