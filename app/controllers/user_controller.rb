class UserController < ApplicationController
  def update
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    user.entrepeneur = 1
    user.save
    redirect_to root_url
  end
end
