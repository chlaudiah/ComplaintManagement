<template>
  <div id="view-inventory">
    <ul class="collection with-header">
      <li class="collection-header">
          <router-link v-bind:to="{name:'input-complaint', params:{nim: this.$route.params.nim}}" class="btn grey">Back</router-link>
        <div class="center">
          <h4>
            Inventaris
          </h4>
        </div>
      </li>
      <table class="responsive-table">
      <thead>
        <tr>
          <th>Kode Inventaris</th>
          <th>Kategori</th>
          <th>Ruangan</th>
          <th>Nama</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in inventaris" v-bind:key="i.id">
          <td>{{i.id}}</td>
          <td>{{i.kategori}}</td>
          <td>{{i.lab}}</td>
          <td>{{i.nama_inventaris}}</td>
          <td>{{i.status}}</td>
        </tr>
      </tbody>
    </table>
    </ul>
    <div class="row">
    <table>
      <thead> <th> Lihat berdasarkan: </th> </thead>
      <thead>
        <tr>
          <th>Ruangan</th>
          <th>Kategori</th>
          <th>Status</th>
          <th>Reset</th>
        </tr>
      </thead>
      <tbody>
        <td><v-select :options="dropdown_ruangan" v-model="sort_ruangan"></v-select></td>
        <td><v-select :options="dropdown_inventaris" v-model="sort_inventaris"></v-select></td>
        <td><v-select :options="dropdown_status" v-model="sort_status"></v-select></td>
        <td><button class="btn grey" @click="refresh">
            Reset
        </button></td>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
export default {
    name: 'view-inventory',
    data(){
        return{
           inventaris: [],
            sort_ruangan:this.$route.params.sort_ruangan,
            sort_inventaris:null,
            sort_status:null,
            dropdown_ruangan:[
              'IFLAB 1',
              'IFLAB 2',
              'IFLAB 3',
              'IFLAB 4',
              'IFLAB 5',
              'ITLAB 1',
              'ITLAB 2'
            ],
            dropdown_inventaris:[
              'PC, Monitor, Keyboard, Mouse', 
              'Mebel: Meja dan Kursi', 
              'Periferal: Proyektor dan Layar', 
              'Elektronik: Air Conditioner (AC)'
            ],
            dropdown_status:[
              'Baik','Rusak', 'Out'
            ],
            headers: [
                {
                    text: "Kode Inventaris",
                    align: 'left',
                    sortable: false,
                    value: 'id'
                },
                {text: 'Kategori', value:'kategori'},
                {text: 'Ruangan', value:'ruangan'},
                {text: 'Nama', value:'nama'},
                {text: 'Status: ', value:'status'},
                {text: 'Aksi', value: 'id', sortable: false}
            ]
        }
    },
    watch:{
      sort_ruangan(sort_ruangan){
        switch(sort_ruangan){
          case 'IFLAB 1':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break
          case 'IFLAB 2':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break
          case 'IFLAB 3':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break
          case 'IFLAB 4':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break
          case 'IFLAB 5':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break
          case 'ITLAB 1':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
           break
          case 'ITLAB 2':
            this.inventaris = this.inventaris.filter(data =>
              sort_ruangan.includes(data.lab)
            )
            break

          default:
            break
        }
      },
      sort_inventaris(sort_inventaris){
        switch(sort_inventaris){
          case 'PC, Monitor, Keyboard, Mouse':
          this.inventaris = this.inventaris.filter(data =>
            sort_inventaris.includes(data.kategori)
          )
          break 
          case 'Mebel: Meja dan Kursi':
          this.inventaris = this.inventaris.filter(data =>
            sort_inventaris.includes(data.kategori)
          )
          break
          case 'Periferal: Proyektor dan Layar':
          this.inventaris = this.inventaris.filter(data =>
            sort_inventaris.includes(data.kategori)
          )
          break
          case 'Elektronik: Air Conditioner (AC)':
          this.inventaris = this.inventaris.filter(data =>
            sort_inventaris.includes(data.kategori)
          )
          break

          default:
            break
        }
      },
      sort_status(sort_status){
        switch(sort_status){
          case 'open':
            this.inventaris = this.inventaris.filter(data => 
              sort_status.includes(data.status)
          )
          break
          case 'close':
            this.inventaris = this.inventaris.filter(data => 
              sort_status.includes(data.status)
          )
          break

          default:
            break   
        }
      }
    },
    created(){
        this.initialize()
    },
    methods:{
      refresh() {
        ;(this.sort_ruangan = null),
          (this.sort_inventaris = null),
          (this.sort_status = null),
          this.initialize()
        },
        initialize(){
            db.inventoryFirestore.collection('inventory')
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    const data={
                        id: doc.data().id,
                        kategori: doc.data().kategori,
                        lab: doc.data().lab,
                        nama_inventaris: doc.data().nama,
                        status: doc.data().status
                    }
                    this.inventaris.push(data)
                })
            })
        }
    }
}
</script>

<style>
.responsive-table{
  padding: 30px;
}
th{
  padding-left: 20px;
}
td {
  padding-left: 20px;
}
</style>