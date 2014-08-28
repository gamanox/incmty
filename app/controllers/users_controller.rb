class UsersController < ApplicationController
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user, status: 200
    end
    private
      def user_params
        params.require(:user).permit(:played, :entrepeneur_id)
      end
    session[:user_id] = user.id
    user.entrepeneur = 1
    user.save
    redirect_to root_url
  end
  def show
    render :index
  end
end
