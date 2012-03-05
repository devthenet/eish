/* Province select box */

window.Province = Backbone.Model.extend()

window.ProvinceList = Backbone.Collection.extend({
  model: Province,
  url: '/provinces'
})

window.ProvinceListItemView = Backbone.View.extend({
  tagName: 'option',

  initialize: function() {
    _.bindAll(this, 'render')
  },

  render: function() {
    $(this.el).html(this.model.get('name') ).attr({ value: this.model.get('name') })
    return this
  }
})

window.ProvinceListView = Backbone.View.extend({
  el: $('#provinces'),

  initialize: function() {
     _.bindAll(this, 'render')
     this.collection.on('reset', this.render, this)
  },

  render: function() {
    self = this
     _.each(this.collection.models, function(province) {
      $(self.el).append( new ProvinceListItemView({model: province}).render().el)
     })
    return this
  }
})

/* Incident Types */
window.IncidentType = Backbone.Model.extend()

window.IncidentTypeList = Backbone.Collection.extend({
  model: IncidentType,
  url: 'incident_types'
})

window.IncidentItemView = Backbone.View.extend({
  tagName: 'option',

  initialize: function() {
    _.bindAll(this, 'render')
  },

  render: function() {
    $(this.el).html(this.model.get('name') ).attr({ value: this.model.get('name') })
    return this
  }
})

window.IncidentListView = Backbone.View.extend({
  el: $('#incident_types'),

  initialize: function() {
     _.bindAll(this, 'render')
     this.collection.on('reset', this.render, this)
  },

  render: function() {
    self = this
     _.each(this.collection.models, function(province) {
       $(self.el).append( new IncidentItemView({model: province}).render().el)
     })
    return this
  }
})


/* Google maps wrappers */
window.MapLocation = Backbone.Model.extend({
  initialize: function() {
    this.geocoder = new google.maps.Geocoder()
  },
  
  setAddress: function(address){
    this.address = address
  },
  
  geoCode: function(){
    self = this
    this.geocoder.geocode( { 'address': this.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        self.trigger('geo_code', results[0].geometry.location)
        return results[0].geometry.location
      } else {
        alert('Could not geocode the address')
        return status
      }
    })
  }
  
})

window.MapLocationForm = Backbone.View.extend({
  el: $('#find_address'),
  
  events: {
    "click" : "addressToPosition"
  },
  
  initialize: function(options) {
    this.map_location = new MapLocation()
    this.map_location.on('geo_code', this.update_map, this)
    this.map = options['map']
  },
  
  addressToPosition: function() {
    address = $('#address').val()
    this.map_location.setAddress(address)
    this.map_location.geoCode()
  },
  
  update_map: function(pos) {
    this.map.moveTo(pos)
  }
})

window.Map = Backbone.View.extend({
  el: $('#map_canvas')[0],
  
  initialize: function() {
    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    this.map = new google.maps.Map( this.el, myOptions)

  },
  
  moveTo: function(position) {
    this.map.setZoom(15)
    this.map.setCenter(position)
  }
  
})

/* Main application setup */

jQuery(document).ready(function() {
  var province_list =  new ProvinceList()
  province_list.fetch()
  var province_list_view = new ProvinceListView({collection: province_list })
  var incident_list = new IncidentTypeList()
  incident_list.fetch()
  var incident_list_view = new IncidentListView({collection: incident_list})
  var map = new Map()
  var map_location_form = new MapLocationForm({map: map})
  window.map_location_form = map_location_form
})

