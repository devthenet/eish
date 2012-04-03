require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'json'

DataMapper.setup(:default, "sqlite3::memory:")


class Province
  include DataMapper::Resource
  property :id, Serial
  property :name, String

  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def to_json(*)
    {name: @name}.to_json
  end
end

get '/provinces' do
  provinces = Province.all
  content_type :json
  provinces.to_json
end

class IncidentType
  include DataMapper::Resource
  property :id, Serial
  property :name, String

  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def to_json(*)
    {name: @name}.to_json
  end
end

get '/incident_types' do
  incident_types = IncidentType.all
  content_type :json
  incident_types.to_json
end

DataMapper.auto_upgrade!
