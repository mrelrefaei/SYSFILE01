import { supabase } from './SYSFILE01';

export interface SYSF1TAB02Item {
  sf1t02f01: number; // المعرف
  sf1t02f02: string; // مفتاح الإعداد
  sf1t02f03: string; // قيمة الإعداد
  sf1t02f04?: string; // الوصف بالعربية
  sf1t02f05: boolean; // الحالة
}

export async function fetchSYSF1TAB02(): Promise<SYSF1TAB02Item[]> {
  const { data, error } = await supabase
    .schema('SYSFILE01')
    .from('SYSF1TAB02')
    .select('*')
    .order('sf1t02f01', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as SYSF1TAB02Item[]) || [];
}