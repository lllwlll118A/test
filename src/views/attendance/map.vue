
<template>
	<el-dialog :visible="mapVisible" append-to-body :before-close="handleClose" :close-on-click-modal="false">
        <!-- <label>地区：<input v-model="keyword"></label> -->
		<baidu-map @click="getLocation" :dragging="true" :scroll-wheel-zoom="true" class="bm-view" :ak="ak" :center="center" :zoom="zoom" @ready="handler">
            <bm-control :offset="{width: '10px', height: '10px'}">
                <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                    <el-input v-model="keyword" style="width:70%"></el-input>
                    <el-button @click="confirmAddress">确定</el-button>
                </bm-auto-complete>
            </bm-control>
            <LocalSearch @markersset="markersset" :selectFirstResult="true" :keyword="keyword" :auto-viewport="true" ></LocalSearch>
            <bm-marker v-if="showMarker" :position="position" :dragging="true"></bm-marker>
        </baidu-map>
	</el-dialog>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import LocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmControl from 'vue-baidu-map/components/controls/Control.vue'
import BmAutoComplete from 'vue-baidu-map/components/others/AutoComplete.vue'
export default {
	name: 'addressChoose',
	data() {
		return {
			ak: 'kpS4LoCnglzvhqU2tofAcIYch1FMZOFD',
			mapVisible: false,
			center: { lng: 0, lat: 0 },
			zoom: 3,
            keyword:'',
            position:{},
            showMarker:false
		}
	},
	components: {
		BaiduMap,
        LocalSearch,
        BmMarker,
        BmControl,
        BmAutoComplete,
        
	},
	methods: {
		init() {
            this.keyword = ""
			this.mapVisible = true
            this.showMarker = false
            this.position ={}
		},
		handler({ BMap, map }) {
			console.log(BMap, map)
			this.center.lng = 116.404
			this.center.lat = 39.915
			this.zoom = 15
		},
        getLocation(e){
            console.log(e)
            this.position = {}
            this.position.lng = e.point.lng
            this.position.lat = e.point.lat
            this.showMarker = true
        },
        markersset(val){
            console.log(val)
            this.position = {}
            this.position.lng = val[0].point.lng
            this.position.lat = val[0].point.lat
            this.position.name = val[0].title
            this.showMarker = true
            console.log(this.position)
        },
        confirmAddress(){
            if(this.position.lng && this.position.lat){
                if(!this.position.name){
                    //接口查询经纬度对应的地名
                }
                this.$emit("succ",this.position)
                this.mapVisible = false
            }else{
                this.$message.error("请选择具体的地点")
            }
        },
        handleClose(){
            this.mapVisible = false
        }
	},
}
</script>
<style>
.bm-view {
	width: 100%;
	height: 700px;
}
</style>