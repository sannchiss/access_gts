import { defineStore } from 'pinia';
import HandlerAccountCompany from '../handlers/HandlerAccountCompany';

const { getAccounts } = HandlerAccountCompany();

export const useFormatStore = defineStore('format', {
  state: () => ({
    entriesCls: [],
    listAccount: [],

    outputCoincidences: [],
    outputNoCoincidences: [],

    convertType: '',

  }),

  getters: {

    getEntries(state) {
      return state.entriesCls
    }


  },

  actions: {


    async getEntry(entry) {

      entry.trim();

      // separate entry by - or \n or \t or ; or ,
      const entries = entry.split(/[-\n\t;,.\s]+/);

      //const entries = entry.split(/\-|\n|\t+/);


      // quitar positiones vacias
      this.entriesCls = entries.filter(entry => entry !== "");



      // count digits in each entry and validate if it is a number
      const counts = this.entriesCls.map(entry => {
        const digits = entry.match(/\d/g);
        return digits ? digits.length : 0;
      });


      // loop in counts
      counts.forEach((count, index) => {
        // console.log('index', index, 'count', count);
        // perform some operation with count
        if (count < 9) {
          //edit entry
          this.entriesCls[index] = '00' + this.entriesCls[index];

          // this.entriesCls.push('00' + this.entriesCls[index]);
        }
        else {
          if (count > 9) {
            this.entriesCls[index] = 'Error long entry: ' + this.entriesCls[index];
          }
        }
      });

      this.listAccount = await getAccounts()
      const entriesUnified = []

      this.listAccount.forEach(account => {
        // unificar listAccount en un solo array
        entriesUnified.push(...account.list_account)

      })

      //entriesCls : es el arreglo de entradas Textarea (solo cuentas)
      //entriesUnified: arreglo BD (toda la informacion de las cuentas)

      // comparo las cuentas ingresadas con las de la BD y las coloco en un array de nombre outputCoincidences


      let cuenta = ''

      switch (this.convertType) {

        case 'txa':
          cuenta = 'cuentaTxa'
          break;
        case 'gts':
          cuenta = 'cuentaGts'
          break;
        case 'empresa':
          cuenta = 'empresa'

      }



      this.entriesCls.forEach((entry) => {

        entriesUnified.forEach((entryUnified) => {

          //console.log("Comparando", entryUnified[cuenta])
          if (entryUnified[cuenta] == entry) {
            this.outputCoincidences.push(entryUnified)
          }

        })



      })





      // extraigo solo las cuentas Txa en un array para poder compararlas
      let cuentaExt = []
      cuentaExt = this.outputCoincidences.map(entry => entry[cuenta])
      console.log("Coincidencias", cuentaExt)

      const uniqueElementsArray1 = this.entriesCls.filter(element => !cuentaExt.includes(element));
      const uniqueElementsArray2 = cuentaExt.filter(element => !this.entriesCls.includes(element));
      this.outputNoCoincidences = [...uniqueElementsArray1, ...uniqueElementsArray2];

      /*       console.warn("Coincidencias", this.outputCoincidences)
            console.log("No coincidencias", this.outputNoCoincidences)
       */
      // limpio el array
      /*  this.outputCoincidences = []
       this.outputNoCoincidences = [] */


    },


  }
})


