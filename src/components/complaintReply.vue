<template>
<div id="complaint-reply">
    <form @submit.prevent="saveReply" class="col s12">
        <div class="center">
            <h4> Complaint Reply </h4>
        </div>
        <div class="row">
            <span> NIM: </span>
            <v-text-field value="nim" v-model="nim" readonly></v-text-field>
        </div>
        <div class="row">
            <span> Ruangan: </span>
            <v-text-field value="selectedRoom" v-model="selectedRoom" readonly></v-text-field>
        </div>
        <div class="row">
            <span> Inventaris: </span>
            <v-text-field value="checkedInventory" v-model="checkedInventory" readonly></v-text-field>
        </div>
        <div class="row">
            <span> Kode Inventaris: </span>
            <v-text-field value="kode_inventaris" v-model="kode_inventaris" readonly></v-text-field>
        </div>
        <div class="row">
            <span> Keluhan Inventaris: </span>
            <v-text-field value="keluhan_inventaris" v-model="keluhan_inventaris" readonly></v-text-field>
        </div>
        <div class="row">
            <span> Status: </span>
            <v-text-field value="status" v-model="status" readonly></v-text-field>
        </div>
        <div class="row">
        <div v-for="message in messages" v-bind:key="message.created" class="collection" box>
                <span> Reply Admin: </span>
                <v-text-field v-model="message.reply_admin" readonly></v-text-field>
                <template v-if="message.answer_mhs !== 'empty'">
                    <span> Jawaban Mahasiswa: </span>
                    <v-text-field v-model="message.answer_mhs" readonly></v-text-field>
                </template>
        </div>
        </div>
        <div class="row" v-if="status === 'open'">
            <div class = "input-field col s12">
                <span> Reply: </span>
                <v-text-field type="text" v-model="reply" placeholder="Reply here"></v-text-field>
                <button type="submit" class="btn"> Submit </button>
            </div>
        </div>
        <div class="row">
        <router-link v-bind:to="{name: 'view-detail-complaint', params: {id: id_complaint}}" class="btn grey"> Back </router-link>
        </div>
        <v-spacer></v-spacer>
    </form>
</div>
</template>

<script>
import db from './firebaseInit'
import uuidv4 from 'uuid/v4'
import { firestore } from 'firebase';
export default {
    name:'complaint-reply',
    data(){
        return{
            messages:[],
            id_complaint:this.$route.params.id_complaint,
            status:'',
            id_reply:uuidv4(),
            reply: '',
            from:'admin',
            nim:null
        }
    },
    created(){
        db.complaintFirestore
            .collection('conversations')
            .where('id_complaint','==',this.$route.params.id_complaint)
            .orderBy("created")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    if(!doc.exists){
                        console.log("Document doesn't exist")
                    }
                    else{
                        console.log("Document exist")
                        const data={
                            created: doc.data().created,
                            reply_admin: doc.data().messages[0].reply,
                            answer_mhs: doc.data().messages[1].answer
                        }
                        this.messages.push(data)
                    }
                })
            })
    },
    beforeRouteEnter(to,from,next){
        db.complaintFirestore
            .collection('complaint')
            .where('id','==',to.params.id_complaint)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    next(vm => {
                        vm.nim=doc.data().nim
                        vm.selectedRoom = doc.data().selectedRoom
                        vm.checkedInventory = doc.data().checkedInventory
                        vm.kode_inventaris= doc.data().kode_inventaris
                        vm.keluhan_inventaris= doc.data().keluhan_inventaris
                        vm.status = doc.data().status
                    })
                })
            })
    },
    watch :{
        fetchData(){
            db.complaintFirestore
                .collection('complaint')
                .where('id', '==', this.$route.params.id_complaint)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.nim=doc.data().nim
                        this.selectedRoom = doc.data().selectedRoom
                        this.checkedInventory = doc.data().checkedInventory
                        this.kode_inventaris= doc.data().kode_inventaris
                        this.keluhan_inventaris= doc.data().keluhan_inventaris
                        this.status = doc.data().status
                    })
                })
        }
    },
    methods:{
        saveReply(){
            db.complaintFirestore.collection('conversations').doc(this.id_reply).set({
                created:firestore.FieldValue.serverTimestamp(),
                id_complaint:this.id_complaint,
                messages:[
                    {
                        id_reply:this.id_reply,
                        from:this.from,
                        to:this.nim,
                        reply:this.reply
                    },
                    {
                        id_answer:'',
                        from:'',
                        to:'',
                        answer:'empty'
                    }
                ]
            })
            .then(docRef => this.$router.push('/dashboard'))
            .catch(error => console.log(error));
        }
    }
}
</script>
