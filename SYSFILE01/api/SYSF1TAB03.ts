import { supabase } from './SYSFILE01';

export interface SYSF1TAB03Item {
  sf1t03f01: number; // المعرف
  sf1t03f02: string; // رمز الوحدة
  sf1t03f03: string; // اسم الوحدة بالعربية
  sf1t03f04: number; // الترتيب
  sf1t03f05: boolean; // الحالة
}

export async function fetchSYSF1TAB03(): Promise<SYSF1TAB03Item[]> {
  const { data, error } = await supabase
    .schema('SYSFILE01')
    .from('SYSF1TAB03')
    .select('*')
    .order('sf1t03f01', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as SYSF1TAB03Item[]) || [];
}