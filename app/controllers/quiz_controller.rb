class QuizController < ApplicationController
  protect_from_forgery with: :exception
  
  def update_user
    
    user = User.from_omniauth(env["omniauth.auth"])

    render :json=>{:updated=>true},:status=>200
  end

  private
    def current_user

      @current_user ||= User.find(session[:user_id]) if session[:user_id]

    end



  helper_method :current_user  

end
