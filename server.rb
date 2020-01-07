require 'sinatra'
require "sinatra/reloader" if development?

also_reload '/public/sketch.js'

set :static_cache_control, [:public, max_age: 0]

get '/' do
    erb :sketch
end