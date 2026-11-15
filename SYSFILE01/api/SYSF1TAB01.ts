import { supabase } from './SYSFILE01';

export interface SYSF1TAB01Item {
  sf1t01f01: number; // المعرف
  sf1t01f02: string; // رمز الحقل
  sf1t01f03: string; // الاسم بالعربية
  sf1t01f04: string; // نوع البيانات
  sf1t01f05: boolean; // الحالة
}

export async function fetchSYSF1TAB01(): Promise<SYSF1TAB01Item[]> {
  const { data, error } = await supabase
    .schema('SYSFILE01')
    .from('SYSF1TAB01')
    .select('*')
    .order('sf1t01f01', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as SYSF1TAB01Item[]) || [];
}