<template>
<div id= "view-detail-complaint">
    <div class="center">
        <h4> Detail Complaint </h4>
    </div>
    <div class="form-detail">
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
        <v-text-field value="tanggal" v-model="tanggal" class="date" readonly></v-text-field>
    
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
            
        <router-link to="/dashboard" class="btn grey"> Back </router-link>
        <template v-if="status != 'close'">
            <button type="submit" class="btn red" v-on:click="updateStatus">Close</button>
        </template>
        <template v-else>
            <button type="delete" @click="deleteComplaint" class="btn red"> Delete </button>
            <button type="submit" class="btn" v-on:click="reopen"> Open </button>
        </template>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'complaint-reply', params: {id_complaint: id}}" class="btn-floating btn-large blue">
                <i class="fa fa-reply"></i>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-detail-complaint',
    data(){
        return{
            conversations:[],
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
            tanggal: new Date()
        }
    },
    beforeRouteEnter(to,from,next){
            db
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
            db
                .collection('complaint')
                .where('id','==',this.$route.params.id)
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
        updateStatus(){
            this.status="close"
            db
                .collection('complaint')
                .doc(this.$route.params.id)
                .update({status: 'close'})
        },
        reopen(){
            this.status="open"
            db
                .collection('complaint')
                .doc(this.$route.params.id)
                .update({status: 'open'})
        },
        deleteComplaint(){
            db.collection('complaint')
            .where('id','==',this.$route.params.id)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                })
            })

            db.collection('conversations')
            .where('id_complaint','==',this.$route.params.id)
            .get()
            .then(Snapshot =>{
                Snapshot.forEach(data =>{
                    data.ref.delete()
                    alert("Data berhasil dihapus. Back untuk kembali ke dashboard")
                })
            })
        }
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
