var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:"",
        musicCover:"",
        hotComment:[],
        isPlaying:false,
        mvUrl:"",
        isShow:false,
        musicer:"",
        musicName:"",
    },
    
    methods:{
        //��������
        searchMusic:function(){
            var that=this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                //console.log(response.data.result.songs);
                that.musicList = response.data.result.songs;
            },function(err){})
        },

        //���Ÿ���
        playMusic:function(musicId){
            var that=this;
            //��ȡ�������ߵ�ַ
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log(response.data.data[0].url);
               //that.musicList = response.data.data[0].url;
               that.musicUrl = response.data.data[0].url;
            },function(err){})

            //��ȡ�������桢���֡���������
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log(response);
               that.musicCover = response.data.songs[0].al.picUrl;
               that.musicer = response.data.songs[0].ar[0].name;
               that.musicName = response.data.songs[0].name;
            },function(err){})

            //��ȡ��������
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                //console.log(response);
               that.hotComment = response.data.hotComments;
            },function(err){})
        },

        //����mv
        playMV:function(mvId){
            var that=this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId)
            .then(function(response){
               that.mvUrl = response.data.data.url;
               that.isShow = true;
            },function(err){})
        },

        //���عر�mv
        hide:function(){
            this.isShow = false;
            this.mvUrl="";
        },


        //������ת
        play:function(){
            this.isPlaying = true;
        },

        //������ͣ
        pause:function(){
            this.isPlaying = false;
        }

    }
})