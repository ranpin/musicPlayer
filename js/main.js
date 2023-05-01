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
        //搜索歌曲
        searchMusic:function(){
            var that=this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                //console.log(response.data.result.songs);
                that.musicList = response.data.result.songs;
            },function(err){})
        },

        //播放歌曲
        playMusic:function(musicId){
            var that=this;
            //获取歌曲在线地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log(response.data.data[0].url);
               //that.musicList = response.data.data[0].url;
               that.musicUrl = response.data.data[0].url;
            },function(err){})

            //获取歌曲封面、歌手、歌曲名称
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log(response);
               that.musicCover = response.data.songs[0].al.picUrl;
               that.musicer = response.data.songs[0].ar[0].name;
               that.musicName = response.data.songs[0].name;
            },function(err){})

            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                //console.log(response);
               that.hotComment = response.data.hotComments;
            },function(err){})
        },

        //播放mv
        playMV:function(mvId){
            var that=this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId)
            .then(function(response){
               that.mvUrl = response.data.data.url;
               that.isShow = true;
            },function(err){})
        },

        //隐藏关闭mv
        hide:function(){
            this.isShow = false;
            this.mvUrl="";
        },


        //封面旋转
        play:function(){
            this.isPlaying = true;
        },

        //封面暂停
        pause:function(){
            this.isPlaying = false;
        }

    }
})