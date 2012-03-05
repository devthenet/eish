require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
require 'json'

class Province 
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def to_json(*)
    {name: @name}.to_json
  end
end

provinces = [  Province.new('Gauteng'), 
               Province.new('Mpumalanga'), 
               Province.new('Western Cape'),
               Province.new('Limpopo')
            ]

get '/provinces' do
  content_type :json
  provinces.to_json
end

class IncidentType
  attr_accessor :name
  
  def initialize(name)
    @name = name
  end

  def to_json(*)
    {name: @name}.to_json
  end
end

incident_types = [ IncidentType.new('Fire'),
                   IncidentType.new('Water outage'),
                   IncidentType.new('Electricity outage'),
                   IncidentType.new('Faulty traffic light'),
                   IncidentType.new('Crime')
                 ]
 
get '/incident_types' do
  content_type :json
  incident_types.to_json
end
