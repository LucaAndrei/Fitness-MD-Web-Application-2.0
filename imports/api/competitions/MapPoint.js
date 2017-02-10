let MapPointSchema = new SimpleSchema({
    'latitude' : {
        type: Number,
        decimal : true
    },
    'longitude' : {
        type: Number,
        decimal : true
    },
    'label' : {
        type : String
    }
})

export default MapPointSchema;