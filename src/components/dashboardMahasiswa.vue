<template>
  <div id="dashboard-mhs">
    <ul class="collection with-header">
      <li class="collection-header">
        <router-link to='/' class="btn grey left"> Logout </router-link>
        <router-link v-bind:to="{name:'input-complaint',params: {nim: this.$route.params.nim}}" class="btn blue right"> <i class="fa fa-plus"></i></router-link>
        <div class="center">
          <h4>
            MyComplaints
          </h4>
        </div>
      </li>
      <table class="responsive-table">
      <thead>
        <tr>
          <th>NIM</th>
          <th>Nama</th>
          <th>Ruangan</th>
          <th>Inventaris</th>
          <th>Kode Inventaris</th>
          <th>Status</th>
          <th>Tanggal Komplain</th>
          <th class="center">Aksi</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in mhs" v-bind:key="c.tanggal">
          <td>{{c.nim}}</td>
          <td>{{c.nama}}</td>
          <td>{{c.selectedRoom}}</td>
          <td>{{c.checkedInventory}}</td>
          <td>{{c.kode_inventaris}}</td>
          <td>{{c.status}}</td>
          <td>{{c.tanggal}}
        <td>
          <router-link class="secondary-content" v-bind:to="{name:'view-complaint',params: {id: c.id}}">
            <i class="fa fa-eye">Detail</i>
          </router-link>
        </td>
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
          <th>Inventaris</th>
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
export default {
    name: 'dashboard-mhs',
    data(){
        return{
           mhs: [],
            sort_ruangan:null,
            sort_inventaris:null,
            sort_status:null,
            dropdown_ruangan:[
              'IFLAB1',
              'IFLAB2',
              'IFLAB3',
              'IFLAB4',
              'IFLAB5',
              'IKLAB1',
              'IKLAB2'
            ],
            dropdown_inventaris:[
              'PC, Monitor, Keyboard, Mouse', 
              'Mebel: Meja dan Kursi', 
              'Periferal: Proyektor dan Layar', 
              'Elektronik: Air Conditioner (AC)'
            ],
            dropdown_status:[
              'close','open'
            ],
            headers: [
                {
                    text: "NIM",
                    align: 'left',
                    sortable: false,
                    value: 'nim'
                },
                {text: 'Nama', value:'nama'},
                {text: 'Ruangan', value:'selectedRoom'},
                {text: 'Inventaris', value:'checkedInventory'},
                {text: 'Kode Inventaris: ', value:'kode_inventaris'},
                {text: 'Status: ', value:'status'},
                {text: 'Aksi', value: 'id', sortable: false}
            ]
        }
    },
    watch:{
      sort_ruangan(sort_ruangan){
        switch(sort_ruangan){
          case 'IFLAB1':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break
          case 'IFLAB2':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break
          case 'IFLAB3':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break
          case 'IFLAB4':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break
          case 'IFLAB5':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break
          case 'IKLAB1':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
           break
          case 'IKLAB2':
            this.mhs = this.mhs.filter(data =>
              sort_ruangan.includes(data.selectedRoom)
            )
            break

          default:
            break
        }
      },
      sort_inventaris(sort_inventaris){
        switch(sort_inventaris){
          case 'PC, Monitor, Keyboard, Mouse':
          this.mhs = this.mhs.filter(data =>
            sort_inventaris.includes(data.checkedInventory)
          )
          break 
          case 'Mebel: Meja dan Kursi':
          this.mhs = this.mhs.filter(data =>
            sort_inventaris.includes(data.checkedInventory)
          )
          break
          case 'Periferal: Proyektor dan Layar':
          this.mhs = this.mhs.filter(data =>
            sort_inventaris.includes(data.checkedInventory)
          )
          break
          case 'Elektronik: Air Conditioner (AC)':
          this.mhs = this.mhs.filter(data =>
            sort_inventaris.includes(data.checkedInventory)
          )
          break

          default:
            break
        }
      },
      sort_status(sort_status){
        switch(sort_status){
          case 'open':
            this.mhs = this.mhs.filter(data => 
              sort_status.includes(data.status)
          )
          break
          case 'close':
            this.mhs = this.mhs.filter(data => 
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
        db.collection('complaint')
        .where('nim','==',this.$route.params.nim)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
                id: doc.data().id,
                nim: doc.data().nim,
                nama: doc.data().nama,
                selectedRoom: doc.data().selectedRoom,
                checkedInventory: doc.data().checkedInventory,
                kode_inventaris: doc.data().kode_inventaris,
                status: doc.data().status,
                tanggal: doc.data().tanggal
            }
            this.mhs.push(data)
          })
        })
      },
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