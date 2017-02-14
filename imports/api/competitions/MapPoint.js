let MapPointSchema = new SimpleSchema({
    'latitude' : {
        type: Number,
        decimal : true,
        optional : true
    },
    'longitude' : {
        type: Number,
        decimal : true,
        optional : true
    },
    'label' : {
        type : String,
        optional : true
    }
})

export default MapPointSchema;