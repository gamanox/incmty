class QuizController < ApplicationController
  # protect_from_forgery with: :exception
  after_action :allow_iframe, only: :embed  
  def update_user
    
    user = User.from_omniauth(env["omniauth.auth"])

    render :json=>{:updated=>true},:status=>200
  end

  private
    def current_user

      @current_user ||= User.find(session[:user_id]) if session[:user_id]

    end


def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
  helper_method :current_user  

end
