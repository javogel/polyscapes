require 'sinatra'
require "sinatra/reloader" if development?

also_reload '/public/sketch.js' if development?
also_reload '/public/sketchOutline.js' if development?

set :static_cache_control, [:public, max_age: 0]

get '/' do
  erb :sketch
end
