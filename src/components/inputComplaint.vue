<template>
    <div id="input-complaint">
        <div class="center">
            <h4> Input Complaint </h4>
        </div>
        <div class="row">
            <form @submit.prevent="saveComplaint" class="col s12">

                <div class="row">
                    <div class="input-field col s12">
                        <span> NIM Mahasiswa: </span>
                        <input type="text" v-model="nim" required readonly>
                        
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <span> Nama Mahasiswa: </span>
                        <input type="text" v-model="nama" required readonly>
                    </div>
                </div>

                <label> Ruangan: </label>
                <v-select 
                    required
                    v-model="selectedRoom"
                    :options="[
                                {label:'- Pilih Ruangan -'},
                                {label:'IFLAB 1', value:'iflab1'},
                                {label:'IFLAB 2', value:'iflab2'},
                                {label:'IFLAB 3', value:'iflab3'},
                                {label:'IFLAB 4', value:'iflab4'},
                                {label:'IFLAB 5', value:'iflab5'},
                                {label:'IKLAB 1', value:'iklab1'},
                                {label:'IKLAB 2', value:'iklab2'}
                            ]">
                </v-select>
                <span> Ruangan: {{selectedRoom.label}} </span>

                <div class="row"></div>
                <label> Inventaris: </label>
                <v-select
                    required
                    v-model="checkedInventory"
                    :options="[
                        {label:'- Pilih Inventaris -'},
                        {label:'PC, Monitor, Keyboard, Mouse', value:'pc'},
                        {label:'Mebel: Meja dan Kursi', value:'mebel'},
                        {label:'Periferal: Proyektor dan Layar', value:'periferal'},
                        {label:'Elektronik: Air Conditioner (AC)', value:'elektronik'}
                    ]">
                </v-select>
                <span> Inventaris: {{checkedInventory.label}} </span>
                <div v-if="checkedInventory != '- Pilih Inventaris -'" >
                    <div class="center">
                    <router-link v-bind:to="{name:'view-inventory', params:{nim: this.$route.params.nim}}" class=" btn blue">View Inventory</router-link>
                    </div>
                </div>
                <div v-if="checkedInventory.value === 'pc'">
                    <div class="input-field col s12">
                        <input type="text" v-model="kode_inventaris" required>
                        <label> Kode PC: </label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" v-model="keluhan_inventaris" required>
                        <label> Keluhan PC: </label>
                    </div>
                </div>
                
                <div v-if="checkedInventory.value === 'mebel'">
                    <div class="input-field col s12">
                        <input type="text" v-model="kode_inventaris" required>
                        <label> Kode Mebel: </label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" v-model="keluhan_inventaris" required>
                        <label> Keluhan Mebel: </label>
                    </div>
                </div>

                <div v-if="checkedInventory.value === 'periferal'">
                    <div class="input-field col s12">
                        <input type="text" v-model="kode_inventaris" required>
                        <label> Kode Periferal: </label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" v-model="keluhan_inventaris" required>
                        <label> Keluhan Periferal: </label>
                    </div>
                </div>

                <div v-if="checkedInventory.value === 'elektronik'">
                    <div class="input-field col s12">
                        <input type="text" v-model="kode_inventaris" required>
                        <label> Kode Elektronik: </label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" v-model="keluhan_inventaris" required>
                        <label> Keluhan Elektronik: </label>
                    </div>
                </div>
            <div class="row"></div>
            <button type="submit" class="btn blue"> Submit </button>
            <router-link v-bind:to="{name: 'dashboard-mhs', params: {nim: this.nim}}" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import uuidv4 from 'uuid/v4'
import { firestore } from 'firebase';
export default {
    name:'input-complaint',
    data(){
        return{
            nim:this.$route.params.nim,
            nama:null,
            id:null,
            currentdate:null,
            selectedRoom:'- Pilih Ruangan -',
            checkedInventory: '- Pilih Inventaris -',
            kode_inventaris:'',
            keluhan_inventaris:'',
            tanggal:new Date(),
            id:uuidv4(),
            inventaris:[]
        }
    },
    beforeRouteEnter(to,from,next){
        db.complaintFirestore.collection('users')
            .where('id','==',to.params.nim)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    next(vm => {
                        vm.nama = doc.data().nama
                    })
                })
            })
    },
    watch:{
        fetchData(){
            db.complaintFirestore.collection('users')
            .where('id','==',this.$route.params.nim)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    this.nama = doc.data().nama
                })
            })
        }
    },
    methods: {
        updateSelect: function () {
            this.selectedRoom = 'updated'
            this.checkedInventory = 'updated'
            console.log(this.$el.textContent) // => 'not updated'
            this.$nextTick(function () {
                console.log(this.$el.textContent) // => 'updated'
            })
        },
        saveComplaint(){
            db.complaintFirestore
                .collection('complaint')
                .doc(this.id)
                .set({
                    id: this.id,
                    nim: this.nim,
                    nama: this.nama,
                    selectedRoom: this.selectedRoom.label,
                    checkedInventory: this.checkedInventory.label,
                    kode_inventaris: this.kode_inventaris,
                    keluhan_inventaris: this.keluhan_inventaris,
                    tanggal: firestore.FieldValue.serverTimestamp(),
                    status:'open'
                })
                .then(docRef => this.$router.push({name: 'dashboard-mhs', params:{nim: this.nim}}))
                .catch(error => console.log(error));
        }
    }
}
</script>

<style>
</style>


