import useSupabase from '../boot/supabase'


export default function HandlerAccountCompany() {

  const { supabase } = useSupabase()

  const getAccounts = async () => {

    const { data: cuentas_gts, error } = await supabase
      .from('cuentas_gts')
      .select('list_account')

    if (error) {
      console.log(error)
    }

    return cuentas_gts

  }

  return {
    getAccounts
  }

}
