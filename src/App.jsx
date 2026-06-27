import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    studentId: '',
    emergencyContact: '',
    size: '',
    addNameOnShirt: '否',
    shirtNameText: '',
    distance: '',
    pace: '',
    healthDeclaration: false,
    remittanceDate: '',
    remittanceAccountLast5: '',
    isNotJoining: false,
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxgDcazUBarn6qie4_HM76TsTstSQ5mnGzRnNuZPjM182YBGKZpeLjM1howPHDC-K3q/exec';
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      await fetch(scriptURL, { 
        method: 'POST', 
        body: data,
        mode: 'no-cors' // Required for Google Apps Script
      });
      
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error!', error.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="app-container">
        <header className="hero-section">
          <div className="hero-content">
            <h1 className="title-main">報名成功！</h1>
            <p className="hero-subtitle">期待在操場上、在賽道上，看到你發光發熱的身影！</p>
          </div>
        </header>
        <main className="main-content">
          <div className="card success-message">
            <div className="success-icon">✓</div>
            <h2>我們已經收到您的資料</h2>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
              請記得依規定完成繳費，並留意社群內的後續公告。
            </p>
            <button 
              className="btn-submit" 
              style={{ marginTop: '2rem', maxWidth: '200px', margin: '2rem auto 0' }}
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '', gender: '', phone: '', email: '', studentId: '', 
                  emergencyContact: '', size: '', addNameOnShirt: '否', shirtNameText: '', distance: '', pace: '', healthDeclaration: false,
                  remittanceDate: '', remittanceAccountLast5: '', isNotJoining: false
                });
              }}
            >
              返回首頁
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="hero-section">
        <div className="hero-content">
          <img src={`${import.meta.env.BASE_URL}hero-title.png`} alt="我們是中央 其他都是地方" style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }} onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div style="background:rgba(255,255,255,0.1);padding:2rem;text-align:center;border-radius:8px;border:1px dashed rgba(255,255,255,0.3);color:#fff;">[請將標題圖片命名為 hero-title.png 並放入 public 資料夾]</div>';
              }} />
        </div>
      </header>

      <main className="main-content">
        <div className="card" style={{ animationDelay: '0.1s' }}>
          <h2 className="card-title">📣 招生訊息</h2>
          <p>各位優秀、充滿活力的學長姊好！</p>
          <p style={{ marginTop: '0.5rem' }}>平時在商場上運籌帷幄、在學業上追求卓越的你，是否也想找個地方放鬆身心、結交跨屆的各界菁英？</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>「一個人可以跑很快，但一群人可以跑很遠！」</p>
          <p style={{ marginTop: '0.5rem' }}>不論你是想挑戰馬拉松的熱血跑者，還是只想維持健康、下班散步的歡樂組，漾跑社都竭誠歡迎你的加入！</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>✨ 今年加入，享有三大頂級專屬禮遇：</h3>
            <ul className="privilege-list">
              <li>
                <div className="privilege-title">1️⃣ 專業教練課 ｜ 讓你跑得更遠、更不受傷 🎯</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>我們特別重金禮聘專業跑步教練，從最基礎的跑姿調整、核心肌群訓練，到呼吸節奏與配速策略，提供系統化的指導。不管是運動新手還是破 PB 高手，都能在這裡安全、無痛地提升自我！</div>
              </li>
              <li>
                <div className="privilege-title">2️⃣ 獨一無二！客製化專屬社服 ｜ 尊榮身份的象徵 👕</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>這次報名，我們準備了史上最強、絕不撞衫的「限量專屬跑衣」！不僅排汗透氣、剪裁絕佳，我們更為每位學長姊客製化秀上您的「專屬姓名」與「學號」。</div>
              </li>
              <li>
                <div className="privilege-title">3️⃣ 萌翻校園！中大松鼠專屬鑰匙圈 ｜ 限量珍藏 🐿️</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>凡報名成功，即贈送設計感十足的中大吉祥物「松鼠鑰匙圈」！精緻可愛，掛在跑袋或車鑰匙上，走到哪裡都是最亮眼的中大人。</div>
              </li>
            </ul>
          </div>

          <div className="info-block">
            <h3 style={{ marginBottom: '1rem' }}>📅 社團活動資訊</h3>
            <p><strong>活動時間：</strong>不定期舉辦練跑與專屬教練課程（詳細時間將於社群內公告）。</p>
            <p style={{ marginTop: '0.5rem' }}><strong>活動地點：</strong>中央大學藍色田徑場（陪你吹著中大的風，一起流汗、一起大笑）。</p>
            <p style={{ marginTop: '0.5rem' }}><strong>適合對象：</strong>沒有任何限制（無跑步經驗絕對沒問題，我們有最強的歡樂加油團！）。</p>
          </div>
          
          <div className="info-block" style={{ backgroundColor: '#fdf8e9', borderLeftColor: '#f59e0b' }}>
            <h3 style={{ marginBottom: '1rem', color: '#b45309' }}>💰 繳費資訊</h3>
            <p><strong>社費：</strong> 3,000 / year</p>
            <p style={{ marginTop: '0.5rem' }}><strong>漾跑社收款帳號銀行：</strong></p>
            <p>合作金庫(006) 龍潭分行<br/>戶名: 簡雅惠<br/>銀行帳號: 0161-765-421717</p>
          </div>
        </div>

        <div className="card" style={{ animationDelay: '0.2s' }}>
          <h2 className="card-title">📝 報名資料填寫</h2>
          <p style={{ color: 'var(--error)', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
            ※ 因社服客製化需要製作時間，名額有限，請學長姊於 2026年9月30日前報名，手腳要快唷！
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">姓名 <span className="required">*</span></label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="請輸入您的真實姓名"
              />
            </div>

            <div className="form-group">
              <label className="form-label">性別 <span className="required">*</span></label>
              <div className="hint-text">有時會影響社服的版型剪裁，如男版/女版</div>
              <div className="radio-group" style={{ flexDirection: 'row', marginTop: '0.5rem' }}>
                <label className="radio-label">
                  <input type="radio" name="gender" value="男" required checked={formData.gender === '男'} onChange={handleChange} />
                  男
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="女" required checked={formData.gender === '女'} onChange={handleChange} />
                  女
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">聯絡電話 <span className="required">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                className="form-control" 
                required 
                value={formData.phone}
                onChange={handleChange}
                placeholder="例如: 0912345678"
              />
            </div>

            <div className="form-group">
              <label className="form-label">常用 Email <span className="required">*</span></label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">學號 <span className="required">*</span></label>
              <input 
                type="text" 
                name="studentId" 
                className="form-control" 
                required 
                value={formData.studentId}
                onChange={handleChange}
                placeholder="例如: 114450012"
              />
            </div>

            <div className="form-group">
              <label className="form-label">緊急聯絡人姓名與電話 {!formData.isNotJoining && <span className="required">*</span>}</label>
              <div className="hint-text">路跑社團涉及戶外運動，這點非常重要！</div>
              <input 
                type="text" 
                name="emergencyContact" 
                className="form-control" 
                required={!formData.isNotJoining}
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="例如: 王小明 0987654321"
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>👕 2. 社服尺寸調查</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              既然報名有送社服，請參考下方尺寸表填寫。<br/>
              📐 <strong>尺寸表為「社服平放測量胸部尺寸」</strong>，請學長姊特別留意！<br/>
              💡 <strong style={{ color: 'var(--error)' }}>貼心提醒：尺寸送出後恕難修改。</strong>
            </p>
            
            {/* Image placeholders - users need to replace src with their actual images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src={`${import.meta.env.BASE_URL}size-chart.png`} alt="社服尺寸表" className="reference-image" onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div style="background:#eee;padding:2rem;text-align:center;border-radius:8px;border:1px dashed #ccc;color:#666;">[請將您的尺寸表圖片命名為 size-chart.png 並放入 public 資料夾]</div>';
              }} />
              <img src={`${import.meta.env.BASE_URL}tshirt-design.png`} alt="社服設計圖" className="reference-image" onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div style="background:#eee;padding:2rem;text-align:center;border-radius:8px;border:1px dashed #ccc;color:#666;">[請將您的衣服設計圖命名為 tshirt-design.png 並放入 public 資料夾]</div>';
              }} />
            </div>

            <div className="form-group">
              <label className="form-label">社服尺寸 <span className="required">*</span></label>
              <select 
                name="size" 
                className="form-control" 
                required
                value={formData.size}
                onChange={handleChange}
              >
                <option value="" disabled>請選擇尺寸</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2L">2L</option>
                <option value="3L">3L</option>
                <option value="4L">4L</option>
                <option value="5L">5L</option>
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="form-label">社服要加上學號/姓名 <span className="required">*</span></label>
              <div className="radio-group" style={{ flexDirection: 'row', marginTop: '0.5rem' }}>
                <label className="radio-label">
                  <input type="radio" name="addNameOnShirt" value="是" required checked={formData.addNameOnShirt === '是'} onChange={handleChange} />
                  是
                </label>
                <label className="radio-label">
                  <input type="radio" name="addNameOnShirt" value="否" required checked={formData.addNameOnShirt === '否'} onChange={handleChange} />
                  否
                </label>
              </div>
            </div>

            {formData.addNameOnShirt === '是' && (
              <div className="form-group">
                <label className="form-label">學號+姓名(英文名 or 中文名) <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="shirtNameText" 
                  className="form-control" 
                  required 
                  value={formData.shirtNameText}
                  onChange={handleChange}
                  placeholder="例如: 114450012 中央蔡依玲 (名字可自由發揮，上限五個字)"
                />
              </div>
            )}

            <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>🏃 3. 跑步背景與健康聲明</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              了解學員的實力，有助於幹部後續分組（如：配速組、歡樂組）與安全評估。
            </p>

            <div className="form-group">
              <label className="form-label">目前常跑距離 {!formData.isNotJoining && <span className="required">*</span>}</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="distance" value="歡樂健康跑" required={!formData.isNotJoining} checked={formData.distance === '歡樂健康跑'} onChange={handleChange} />
                  歡樂健康跑
                </label>
                <label className="radio-label">
                  <input type="radio" name="distance" value="5公里" required={!formData.isNotJoining} checked={formData.distance === '5公里'} onChange={handleChange} />
                  5公里
                </label>
                <label className="radio-label">
                  <input type="radio" name="distance" value="10公里" required={!formData.isNotJoining} checked={formData.distance === '10公里'} onChange={handleChange} />
                  10公里
                </label>
                <label className="radio-label">
                  <input type="radio" name="distance" value="半馬" required={!formData.isNotJoining} checked={formData.distance === '半馬'} onChange={handleChange} />
                  半馬
                </label>
                <label className="radio-label">
                  <input type="radio" name="distance" value="全馬" required={!formData.isNotJoining} checked={formData.distance === '全馬'} onChange={handleChange} />
                  全馬
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">配速參考（選填）</label>
              <input 
                type="text" 
                name="pace" 
                className="form-control" 
                value={formData.pace}
                onChange={handleChange}
                placeholder="例如: 10K平均跑速 6分半"
              />
            </div>

            <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>💰 4. 匯款資料回報</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              {formData.isNotJoining 
                ? '請於填表前或填表後儘速完成繳費（僅加購衣服：599元），並留下您的匯款資訊以供對帳。'
                : '請於填表前或填表後儘速完成繳費（社費：3,000元），並留下您的匯款資訊以供對帳。'}
            </p>

            <div className="form-group">
              <label className="form-label">匯款日期 <span className="required">*</span></label>
              <input 
                type="date" 
                name="remittanceDate" 
                className="form-control" 
                required 
                value={formData.remittanceDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">匯款帳號末5碼 <span className="required">*</span></label>
              <input 
                type="text" 
                name="remittanceAccountLast5" 
                className="form-control" 
                required 
                maxLength="5"
                value={formData.remittanceAccountLast5}
                onChange={handleChange}
                placeholder="例如: 12345"
              />
            </div>

            <div className="form-group" style={{ marginTop: '2rem', background: '#fff1f2', padding: '1.5rem', borderRadius: '8px', border: '1px solid #fecdd3' }}>
              <label className="form-label" style={{ color: '#be123c' }}>健康狀況聲明 {!formData.isNotJoining && <span className="required">*</span>}</label>
              <div className="checkbox-group" style={{ marginTop: '1rem' }}>
                <label className="checkbox-label" style={{ alignItems: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    name="healthDeclaration" 
                    required={!formData.isNotJoining}
                    checked={formData.healthDeclaration}
                    onChange={handleChange}
                    style={{ marginTop: '0.25rem' }}
                  />
                  <span style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#881337' }}>
                    本人確認自身無不適合劇烈運動之疾病（如心臟病、高血壓等），並同意在參與中央大學漾跑社活動期間，自行評估身體狀況，若有不適將立即停止運動。本人了解戶外運動存在一定風險，願意自行承擔相關責任（免責聲明）。
                  </span>
                </label>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: '#f8fafc' }}>
              <label className="checkbox-label" style={{ alignItems: 'flex-start' }}>
                <input 
                  type="checkbox" 
                  name="isNotJoining" 
                  checked={formData.isNotJoining}
                  onChange={handleChange}
                  style={{ marginTop: '0.25rem' }}
                />
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  我不入社，僅加購社服（一件 599 元）
                  <div style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    勾選此項後，上方的「緊急聯絡人」、「跑步組別」與「健康狀況聲明」將改為不需填寫。
                  </div>
                </span>
              </label>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <><div className="spinner"></div> 送出中...</>
                ) : (
                  '確認送出報名'
                )}
              </button>
            </div>
            
            {status === 'error' && (
              <p style={{ color: 'var(--error)', textAlign: 'center', marginTop: '1rem' }}>
                送出失敗，請稍後再試。
              </p>
            )}

          </form>
        </div>
      </main>
      
      <footer style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>中央大學漾跑社 幹部團隊 敬邀 🙏</p>
        <p style={{ marginTop: '0.5rem' }}>漾出活力，跑出精彩！</p>
      </footer>
    </div>
  );
}

export default App;
