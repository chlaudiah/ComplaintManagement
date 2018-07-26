<template>
<div id= "view-complaint">
    <div class="center">
        <h4> Detail Complaint </h4>
    </div>
    <form class="form-detail">
        <div class="text-field xs12 sm6">
            <span> ID Complaint: </span>
            <v-text-field value="id" v-model="id" readonly></v-text-field>
        </div>

        <div class="text-field xs12 sm6">
            <span> NIM Mahasiswa: </span>
            <v-text-field value="nim" v-model="nim" readonly></v-text-field>
        </div>

        <span> Nama Mahasiswa: </span>
        <v-text-field value="nim" v-model="nama" readonly></v-text-field>

        <span> Tanggal Komplain: </span>
        <v-text-field value="tanggal" v-model="tanggal"  readonly></v-text-field>
    
        <span> Ruangan: </span>
        <v-text-field value="selectedRoom" v-model="selectedRoom" readonly></v-text-field>
    
        <span> Inventaris: </span>
        <v-text-field value="checkedInventory" v-model="checkedInventory" readonly></v-text-field>
    
        <span> Kode Inventaris: </span>
        <v-text-field value="kode_inventaris" v-model="kode_inventaris" readonly></v-text-field>
    
        <span> Keluhan Inventaris: </span>
        <v-text-field value="keluhan_inventaris" v-model="keluhan_inventaris" readonly></v-text-field>
    
        <span> Status: </span>
        <v-text-field value="status" v-model="status" readonly></v-text-field>
            
        <router-link v-bind:to="{name: 'dashboard-mhs', params: {nim: this.nim}}" class="btn grey"> Back </router-link>

            <router-link v-bind:to="{name: 'complaint-answer', params: {id_complaint: this.id}}" class="btn">
                Conversations
            </router-link>
        
    </form>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-complaint',
    data(){
        return{
            id:null,
            nim: null,
            nama: null,
            selectedRoom: '',
            checkedInventory: '',
            kode_inventaris:'',
            keluhan_inventaris:'',
            reply: 'empty',
            reply_mahasiswa:'empty',
            status:'',
            tanggal: Date()
        }
    },
    beforeRouteEnter(to,from,next){
            db.complaintFirestore
                .collection('complaint')
                .where('id','==',to.params.id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc =>{
                        next (vm =>  {
                            vm.id = doc.data().id
                            vm.nim = doc.data().nim
                            vm.nama = doc.data().nama
                            vm.selectedRoom = doc.data().selectedRoom
                            vm.checkedInventory = doc.data().checkedInventory,
                            vm.kode_inventaris= doc.data().kode_inventaris,
                            vm.keluhan_inventaris= doc.data().keluhan_inventaris
                            vm.status=doc.data().status
                            vm.tanggal=doc.data().tanggal
                        })
                    })
                })
    },
    watch:{
        $route: 'fetchData'
    },
    methods:{
        fetchData(){
            db.complaintFirestore
                .collection('complaint')
                .where('id','==',to.params.id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.id = doc.data().id
                        this.nim = doc.data().nim
                        this.nama = doc.data().nama
                        this.selectedRoom = doc.data().selectedRoom
                        this.checkedInventory = doc.data().checkedInventory
                        this.kode_inventaris= doc.data().kode_inventaris
                        this.keluhan_inventaris=doc.data().keluhan_inventaris
                        this.status=doc.data().status
                        this.tanggal=doc.data().tanggal
                    })
                })
        },
    }
}
</script>

<style>
    .form-detail{
        margin:0% auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }

    .center{
        margin-top: 0.5cm;
    }

    .btn{
        margin-bottom: 0.5cm;
    }
</style>
