class Api::V1::InvitationController < ApiController
  def create
    @model = Invitation.new(invitation_params)
    if @model.save
      InvitationMailer.with(invitation: @model).invitation_email.deliver_later
      render json: @model, status: :created
    else
      render json: { errors: @model.errors }, status: :unprocessable_entity
    end
  end

  def index
    @invitations = Invitation.where(invited_by_user_id: current_user.id)
    render json: { results: @invitations }
  end

  private

  def invitation_params
    params.permit(:email).merge(invited_by_user_id: current_user.id)
  end
end
