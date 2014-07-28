class WelcomeController < ApplicationController
    protect_from_forgery with: :exception
  def index
    @category = Category.all

  end
  private
  def current_user

    @current_user ||= User.find(session[:user_id]) if session[:user_id]

  end

  helper_method :current_user
end
