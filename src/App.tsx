import { useEffect, useState } from 'react';
import { fetchSYSF1TAB01, type SYSF1TAB01Item } from '../SYSFILE01/api/SYSF1TAB01';
import { fetchSYSF1TAB02, type SYSF1TAB02Item } from '../SYSFILE01/api/SYSF1TAB02';
import { fetchSYSF1TAB03, type SYSF1TAB03Item } from '../SYSFILE01/api/SYSF1TAB03';

export default function App() {
  const [tab01Data, setTab01Data] = useState<SYSF1TAB01Item[]>([]);
  const [tab02Data, setTab02Data] = useState<SYSF1TAB02Item[]>([]);
  const [tab03Data, setTab03Data] = useState<SYSF1TAB03Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchSYSF1TAB01(), fetchSYSF1TAB02(), fetchSYSF1TAB03()])
      .then(([d1, d2, d3]) => {
        setTab01Data(d1);
        setTab02Data(d2);
        setTab03Data(d3);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '25px', fontFamily: 'Tahoma, sans-serif', direction: 'rtl', background: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h1 style={{ color: '#333', fontSize: '24px' }}>نظام ERP - الهيكل المركزي (SYSFILE)</h1>
        <p style={{ color: '#666' }}>متصل بقاعدة بيانات Supabase - سكيما `SYSFILE01` (المعيار الهندسي التام بأسماء الجداول)</p>
      </header>

      {loading && <p>جاري الاتصال وجلب بيانات الهيكل المركزي...</p>}
      {error && <p style={{ color: 'red' }}>حدث خطأ في الاتصال: {error}</p>}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* جدول SYSF1TAB01 */}
          <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '15px', color: '#0056b3' }}>1. جدول قاموس البيانات الأساسي (SYSF1TAB01)</h3>
            <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', borderColor: '#ddd' }}>
              <thead>
                <tr style={{ background: '#0056b3', color: '#fff', textAlign: 'right' }}>
                  <th>sf1t01f01 (المعرف)</th>
                  <th>sf1t01f02 (رمز الحقل)</th>
                  <th>sf1t01f03 (الاسم بالعربية)</th>
                  <th>sf1t01f04 (نوع البيانات)</th>
                  <th>sf1t01f05 (الحالة)</th>
                </tr>
              </thead>
              <tbody>
                {tab01Data.map((item) => (
                  <tr key={item.sf1t01f01} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{item.sf1t01f01}</td>
                    <td><code>{item.sf1t01f02}</code></td>
                    <td>{item.sf1t01f03}</td>
                    <td>{item.sf1t01f04}</td>
                    <td>
                      <span style={{ padding: '3px 6px', borderRadius: '4px', background: item.sf1t01f05 ? '#e6f4ea' : '#fce8e6', color: item.sf1t01f05 ? '#137333' : '#c5221f', fontSize: '12px' }}>
                        {item.sf1t01f05 ? 'مفعل' : 'معطل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* جدول SYSF1TAB02 */}
          <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '15px', color: '#137333' }}>2. جدول إعدادات النظام العامة (SYSF1TAB02)</h3>
            <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', borderColor: '#ddd' }}>
              <thead>
                <tr style={{ background: '#137333', color: '#fff', textAlign: 'right' }}>
                  <th>sf1t02f01 (المعرف)</th>
                  <th>sf1t02f02 (مفتاح الإعداد)</th>
                  <th>sf1t02f03 (القيمة)</th>
                  <th>sf1t02f04 (الوصف بالعربية)</th>
                  <th>sf1t02f05 (الحالة)</th>
                </tr>
              </thead>
              <tbody>
                {tab02Data.map((config) => (
                  <tr key={config.sf1t02f01} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{config.sf1t02f01}</td>
                    <td><code>{config.sf1t02f02}</code></td>
                    <td><b>{config.sf1t02f03}</b></td>
                    <td>{config.sf1t02f04}</td>
                    <td>
                      <span style={{ padding: '3px 6px', borderRadius: '4px', background: config.sf1t02f05 ? '#e6f4ea' : '#fce8e6', color: config.sf1t02f05 ? '#137333' : '#c5221f', fontSize: '12px' }}>
                        {config.sf1t02f05 ? 'مفعل' : 'معطل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* جدول SYSF1TAB03 */}
          <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '15px', color: '#b26a00' }}>3. جدول وحدات ونظم الهيكل الرئيسي (SYSF1TAB03)</h3>
            <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', borderColor: '#ddd' }}>
              <thead>
                <tr style={{ background: '#b26a00', color: '#fff', textAlign: 'right' }}>
                  <th>sf1t03f01 (المعرف)</th>
                  <th>sf1t03f02 (رمز الوحدة)</th>
                  <th>sf1t03f03 (اسم الوحدة بالعربية)</th>
                  <th>sf1t03f04 (الترتيب)</th>
                  <th>sf1t03f05 (الحالة)</th>
                </tr>
              </thead>
              <tbody>
                {tab03Data.map((mod) => (
                  <tr key={mod.sf1t03f01} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{mod.sf1t03f01}</td>
                    <td><code>{mod.sf1t03f02}</code></td>
                    <td><b>{mod.sf1t03f03}</b></td>
                    <td>{mod.sf1t03f04}</td>
                    <td>
                      <span style={{ padding: '3px 6px', borderRadius: '4px', background: mod.sf1t03f05 ? '#e6f4ea' : '#fce8e6', color: mod.sf1t03f05 ? '#137333' : '#c5221f', fontSize: '12px' }}>
                        {mod.sf1t03f05 ? 'مفعل' : 'معطل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </div>
      )}
    </div>
  );
}