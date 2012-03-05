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
